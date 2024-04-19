import React, { useState, useEffect } from 'react';
import {
  FlatList, Pressable, Alert, Image, Text, StyleSheet, ActivityIndicator, View, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    if (loading || !hasMore) return; // หยุดการโหลดถ้ากำลังโหลดอยู่หรือไม่มีข้อมูลเพิ่มเติม
    setLoading(true);
    const offset = (page - 1) * 8;

    try {
      const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `offset=${offset}&countpage=8`
      };

      const response = await fetch(`https://shop.nargor.dev/api/async?action=product`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.data.length > 0) {
        setData(prevData => [...prevData, ...json.data]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); // ไม่มีข้อมูลเพิ่มเติม
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // โหลดข้อมูลครั้งแรก
  }, []);

  const onDetail = (id) => {
    Alert.alert("Product ID", `The product ID is ${id}`);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => onDetail(item.p_id)}>
      <Image style={styles.image} source={{ uri: item.p_image }} />
      <Text style={styles.text}>{item.p_name}</Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.searchbar}>
        <TextInput
          placeholder="ค้าหาสินค้า..."
          keyboardType="default"
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `key-${item.p_id}-${index}`}
        numColumns={2}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  searchbar: {
    flex: 0.10
  },
  container: {
    backgroundColor: "#F4F5AB",
    flex: 0.90
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  }
});

export default Home;

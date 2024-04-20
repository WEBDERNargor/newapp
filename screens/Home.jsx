import React, { useState, useEffect } from 'react';
import {
  FlatList, Pressable, Alert, Image, Text, StyleSheet, ActivityIndicator, View, TextInput, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const offset = (page - 1) * 12;

    try {
      const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `offset=${offset}&countpage=12`
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
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onDetail = (id) => {
    navigation.navigate('Detail', {id})
    // Alert.alert("Product ID", `The product ID is ${id}`);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => onDetail(item.p_id)}>
      <Image style={styles.image} source={{ uri: item.p_image }} />
      <Text style={styles.text}>{item.p_name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.wrapper} behavior="none" keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        <View style={styles.searchbar}>
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  searchbar: {
    flex:0.07,
    backgroundColor: 'white', // สีพื้นหลังของแถบค้นหา
    padding: 10, // ระยะขอบภายใน
    flexDirection:'row'
    
  },
  input: {
    height: '100%',
    backgroundColor: '#F0F0F0', // สีพื้นหลังของช่องใส่ข้อความ
    borderRadius: 10, // รูปแบบขอบมน
    paddingLeft: 10, // ระยะห่างด้านซ้ายของข้อความ
    flex:0.90
  },
  container: {
    backgroundColor: "#F4F5AB",
    flex: 0.93
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

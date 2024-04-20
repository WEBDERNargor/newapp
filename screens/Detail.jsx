import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';  // Import the library

const Detail = ({ navigation, route }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${route.params.id}`,
    };

    fetch("https://shop.nargor.dev/api/async?action=single_product", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setData({ data: {  p_name: 'Error', p_price: 'N/A' } }); // Fallback data on error
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animatable.View animation="fadeIn" duration={800} style={styles.imagezone}>
          <Image
            source={data?.data?.p_image ? { uri: data.data.p_image } : require('../img/loading/01.gif')}
            style={styles.image}
            resizeMode="cover" // Changed to 'cover' to maintain aspect ratio
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.titlezone}>
          <Text style={styles.textprice}>{data?.data?.p_price}</Text>
          <Text style={styles.textproduct}>{data?.data?.p_name}</Text>
        </Animatable.View>
        {isLoading ? (
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.loadingText}>
            Loading...
          </Animatable.Text>
        ) : (
         <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  scrollView: {
    flex: 1,
    width: "100%"
  },
  imagezone: {
    height: 300,
    width: screenWidth
  },
  image: {
    height: "100%",
    width: "100%"
  },
  titlezone: {
    padding: 20
  },
  textproduct: {
    fontSize: 17
  },
  textprice: {
    color: "#FCA20E",
    fontSize: 20
  },
  loadingText: {
    flex: 1,
    textAlign: 'center', // Centers text horizontally
    marginTop: 150, // Adjust as needed for vertical centering
  },
});

export default Detail;

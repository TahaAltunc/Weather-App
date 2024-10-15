import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';


const API_KEY = 'a10f869e5ac76836a418e70a7704671e'; 
const cities = ['İstanbul', 'Mersin', 'İzmir', 'Batman', 'Osmaniye', 'Erzurum'];


const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = cities.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},TR&units=metric&appid=${API_KEY}&lang=tr`)
        );
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Hava durumu verileri alınırken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  const backgroundImg = require('./assets/resim5.jpg');

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
    <ScrollView style={styles.container}>
    <Text style={styles.header}>Günlük Hava Durumları</Text>
    <View style={styles.cityContainer}>
      <View style={styles.column}>
        {weatherData.slice(0, 3).map((cityData, index) => (
          <View key={index} style={styles.cityBox}>
            <Text style={styles.cityName}>{cityData.name}</Text>
            <Text style={styles.temperature}>{Math.round(cityData.main.temp)}°C</Text>
            <Text style={styles.humidity}>Nem: %{cityData.main.humidity}</Text>
            <Text style={styles.description}>{cityData.weather[0].description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.column}>
        {weatherData.slice(3).map((cityData, index) => (
          <View key={index} style={styles.cityBox}>
            <Text style={styles.cityName}>{cityData.name}</Text>
            <Text style={styles.temperature}>{Math.round(cityData.main.temp)}°C</Text>
            <Text style={styles.humidity}>Nem: %{cityData.main.humidity}</Text>
            <Text style={styles.description}>{cityData.weather[0].description}</Text>
          </View>
        ))}
      </View>
    </View>
   </ScrollView>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderWidth: 3,
    borderColor: 'red', 
    padding: 20,
    borderRadius: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cityContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  column: {
    width: '48%',
  },
  cityBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 45,
    padding: 30,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'red', 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cityName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  temperature: {
    fontSize: 20,
    color: '#000',
  },
  humidity: {
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, 
  }
});


export default App;
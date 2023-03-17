import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
// import "react-native-gesture-handler";
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const API_KEY = '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';

  const API_BODY = {
    "model": "text-davinci-003",
    "prompt": "Write a short recipe based on these ingredients: " + ingredients,
    "temperature": 0.3,
    "max_tokens": 120,
    "top_p": 1.0,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
  }

  async function callOpenAI() {
    console.log('Calling OpenAI API')
    await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify(API_BODY)
    })
      .then(res => res.json())
      .then(data => {
        setRecipe(data.choices[0].text);
      });
  }

  const API_BODY2 = {
    "prompt": ingredients,
    "n": 1,
    "size": "512x512"
  }

  async function callOpenAI2() {
    console.log('Calling OpenAI API2')
    await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify(API_BODY2)
    })
      .then(res => res.json())
      .then(data => {
        // setRecipe(data.choices[0].text);
        console.log(data.data[0].url);
        setRecipe(data.data[0].url);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: '#0096FF' }}>
        AI Image Generator
      </Text>
      <View>
        <TextInput
          style={{ fontSize: 24, color: 'gray', margin: 10 }}
          placeholder="enter ingredients here"
          editable
          multiline
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) =>
            setIngredients(text)
          }>
        </TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={callOpenAI2}
      >
        <Text style={styles.buttonText}>Generate Image</Text>
      </TouchableOpacity>
      <View>
        <Text>
          {/* {recipe} */}
        </Text>
        {recipe ? (<Image style={styles.images} source={{ uri: recipe }} />) : null}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  button: {
    backgroundColor: '#0096FF',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  images: {
    height: 300,
    width: 300,
    borderRadius: 5,
  }
});

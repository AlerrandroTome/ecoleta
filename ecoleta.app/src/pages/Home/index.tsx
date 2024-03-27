import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, View, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Pressable, Platform } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  function handleNavigationToPoints() {
    navigation.navigate('Points', { city: city, uf: state});
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground style={styles.container} 
            source={require('../../assets/home-background.png')} 
            imageStyle={{ width: 274, height: 368 }}
            >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Your waste collection marketplace.</Text>
                <Text style={styles.description}>We help people find collection points efficiently.</Text>
            </View>
            
            <View style={styles.footer}>
              <View>
                <TextInput style={styles.input} placeholder='State' value={state} onChangeText={setState} maxLength={2} autoCapitalize='characters' autoCorrect={false} />
                <TextInput style={styles.input} placeholder='City' value={city} onChangeText={setCity} autoCorrect={false} autoCapitalize='words' />
              </View>
              <Pressable style={styles.button} onPress={handleNavigationToPoints}>
                <View style={styles.buttonIcon}>
                  <Icon name='arrow-right' color='#FFF' size={24} />
                </View>
                <Text style={styles.buttonText}>
                    Enter
                </Text>
              </Pressable>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 31,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 320,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  }); 

export default Home;
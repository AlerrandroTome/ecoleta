import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Pressable, SafeAreaView } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';

const Detail = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    function handleNavigationBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationBack}>
                    <Icon name='arrow-left' size={20} color='#34cb79' />
                </TouchableOpacity>
                <Image style={styles.pointImage} source={{ uri: "https://images.unsplash.com/photo-1581264669997-3f222f331aaa?q=60&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
                <Text style={styles.pointName}>John's Market</Text>
                <Text style={styles.pointItems}>Lamps, Oil...</Text>
                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Address</Text>
                    <Text style={styles.addressContent}>Fortaleza, CE</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={() => {}}>
                    <FontAwesome name='whatsapp' size={20} color='#FFF' />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </Pressable>                
                
                <Pressable style={styles.button} onPress={() => {}}>
                    <Icon name='mail' size={20} color='#FFF' />
                    <Text style={styles.buttonText}>Email</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail;
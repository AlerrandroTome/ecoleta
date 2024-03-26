import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const Points = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [showMap, setShowMap] = useState(false);
    
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    function handleNavigationBack() {
      navigation.goBack();
    }

    function handleNavigateToDetail() {
        navigation.navigate('Detail');
    }

    async function GetInitialPosition() {
        await Location.getCurrentPositionAsync().then(response => {
            setInitialPosition([response.coords.latitude, response.coords.longitude]);
            setShowMap(true);
        }).catch(error => {
            Alert.alert('Oooops...', error.message);
            return;
        });
    }
    
    useEffect(() => {
        async function loadPosition() {
            await Location.requestForegroundPermissionsAsync().then(async response => {
                if(response.status !== 'granted')
                {
                    Alert.alert('Oooops...', 'We need you permission to get the location.');
                    return;
                }
                
                await GetInitialPosition();
    
            }).catch(error => {
                Alert.alert('Oooops...', error.message);
                return;
            });
            
        }

        loadPosition();
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationBack}>
                    <Icon name='arrow-left' size={20} color='#34cb79' />
                </TouchableOpacity>
                <Text style={styles.title}>Welcome.</Text>
                <Text style={styles.description}>Find a collection point on the map..</Text>

                <View style={styles.mapContainer}>
                    {showMap && (
                        <MapView style={styles.map} initialRegion={{ latitude: initialPosition[0], longitude: initialPosition[1], latitudeDelta: 0.014, longitudeDelta: 0.014}} >
                            <Marker coordinate={{ latitude: -15.7213698, longitude: -48.102167 }} onPress={handleNavigateToDetail} >
                                <View style={styles.mapMarkerContainer}>
                                    <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1581264669997-3f222f331aaa?q=60&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} />
                                    <Text style={styles.mapMarkerTitle}>Market</Text>
                                </View>
                            </Marker>
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} >
                    {items.map(item => (
                    <TouchableOpacity key={String(item.id)} style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} onPress={() => handleSelectItem(item.id)} activeOpacity={0.6} >
                        <SvgUri width={42} height={42} uri={item.image_url} />
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </TouchableOpacity>))}
                </ScrollView>
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;
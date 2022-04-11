import React from 'react';
import {KeyboardAvoidingView,ImageBackground, Platform, StyleSheet, Text, View, ActivityIndicator,StatusBar} from 'react-native';
import SearchInput from './components/searchInput'; 
import getImageWeather from './utils/getImageWeather';
import { fetchLocationId,fetchWeather } from './utils/api';

export default class App extends React.Component{

    constructor(props){
      super(props)
      this.setState = {
        loading:false,
        error:false,
        location: ' ',
        weather: ' ',
        temperature: 0,
    };
  }

  componentDidMount(){
    this.handleUpdateLocation('Dubai');
  }
    handleUpdateLocation = async city =>{
      if(!city) return ;
      this.setState({loading: true}, async () =>{
        try
        { 
          const locationId= await fetchLocationId(city);
          const {location,weather,temperature} = await fetchWeather(locationId,weather,temperature);

          this.setState({
            loading:false,
            error:false,
            location,
            weather,
            temperature,

          });
        } catch(e){
          this.setState({
            loading:false,
            error:true,
        });
    }
  });
};
    render() {
      const {
      loading,
      error,
      location,
      weather,
      temperature,
      }= this.setState;

      return(
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <StatusBar barStyle="light-content"/>
    <ImageBackground
    source={getImageWeather(weather)}
    style={styles.imageContainer}
    imageStyle={styles.image}>
    <View style={styles.container}>
      <Text style={[styles.textStyle,styles.largeText]}>SHANGHAI</Text>
      <Text style={[styles.smallText,styles.textStyle]}>Light Cloud</Text>
      <Text style={[styles.smallText,styles.textStyle]}>23 Degrees</Text>
    
      <ActivityIndicator animating={loading} color='white' size="large" />
      {!loading && (
        <View>
          {error &&(
              <Text style={[styles.largeText,styles.textStyle]}>
          Could not load weather, Please try a Different city.
          </Text>    
          )}
          {
            !error &&(
              <View>
                  <Text style={[styles.smallText,styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText,styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.smallText,styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
              </View>
            )
          }
          <searchInput placeholder="search any city" onSubmit={this.handleUpdateLocation}/>
        </View>
  )}
  </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    textAlign:'center',
    fontFamily:Platform.OS == 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText:
  {
    fontSize: 45,
  },

  smallText:{
    fontSize:20,
  },

  textInput:
  {
  backgroundColor:'blue',
  color:'black',
  height:45,
  width:300,
        backgroundColor:'#666',
        color:'black',
        marginTop:25,
        marginHorizontal:20,
        paddingHorizontal:10,
        alignSelf:'center',
  },
  imageContainer:{
    flex:1,
  },
  image:{
    flex:1,
    width:null,
    resizeMode:'cover',
  },
});

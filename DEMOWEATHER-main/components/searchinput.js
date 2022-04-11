import React from 'react';
import {StyleSheet,View,TextInput} from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component{


    static prototypes = {
        onSubmit: PropTypes.func.isRequired,
        placeholder:PropTypes.string,
    };

    static defaultProps = {
        placeholder:'',
    };

    state = {
        text:'',
    };

    handleChangeText= text =>{
        this.setState({text});
    }

    handleSubmitEditing= () => {
        const {onSubmit} = this.props;
        const {text} =this.state;

        if(!text) return;
        onSubmit(text);
        this.setState({text:''});
    }
    render(){
        const {placeholder}=this.props;
        const {text}=this.state;
        return(
<view styles={styles.container}>
<TextInput
        autoCorrect={false}
        placeholder="Fetch any City"
        placeholderTextColor="Red"
        style={StyleSheet.textInput}
        clearButtonMode="always"
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}
        />
</view>

        );
    }
}
const styles= StyleSheet.create({
    container:{
        height:40,
        width:300,
        backgroundColor:'#666',
        color:'black',
        marginTop:25,
        marginHorizontal:20,
        paddingHorizontal:10,
        alignSelf:'center',
        borderRadius:5,      
    },
    
    textinput:{
      flex:1,
      color:'white',
    },
})
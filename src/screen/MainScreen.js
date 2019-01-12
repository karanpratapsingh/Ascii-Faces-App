import React, { Component } from 'react';
import { 
    View,
    Text,
    Clipboard,
    StatusBar,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';
import AppStyle from '../styles/AppStyles';
import GridView from 'react-native-super-grid';
import AsciiFacesData from '../data/ascii-faces-data.json';
import { SearchBar } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import Collapsible from 'react-native-collapsible-header';
import { responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const { primaryThemeColor, primaryBackgroundColor } = AppStyle;

class MainScreen extends Component {

    constructor(props) {

        super(props);
        
        this.state = {

            searchQuery: ''
        };
    };
    _handleSearch = (text) => this.setState({ searchQuery: text });

    _copyToClipboard = (text) => {

        Clipboard.setString(text);
        this.dropdown.alertWithType('success', 'Copied!', 'Copied to your clipboard');
    };

    _renderList = (ascii) => {

        let { art } = ascii;

        return (
            <TouchableOpacity onPress={() => this._copyToClipboard(art)} style={{ alignItems: 'center', justifyContent: 'center', height: responsiveHeight(20), padding: 4, borderRadius: 10, backgroundColor: primaryThemeColor }}>
                <Text style={{ color: '#FFF', fontSize: Platform.OS === 'ios' ? responsiveFontSize(3.60) : responsiveFontSize(3.20) }}>{art}</Text>
            </TouchableOpacity>
        );
    };

    render() {

        let { searchQuery } = this.state;

        let filteredAsciiFacesData = [...AsciiFacesData].filter(ascii => {

            let { name } = ascii;

            if (searchQuery === '') return ascii;
            else if (name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) return ascii;

        });

        return (
            <View style={styles.container}>

                <StatusBar
                    backgroundColor={'transparent'}
                    barStyle={'light-content'}
                />

                <Collapsible
                    backgroundColor={primaryBackgroundColor}
                    min={Constants.statusBarHeight}
                    max={Platform.OS === 'ios' ? responsiveHeight(10) : responsiveHeight(12)}
                    renderHeader={

                        <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, flexDirection: 'row' }}>

                            <SearchBar
                                noIcon
                                lightTheme
                                platform={'ios'}
                                value={this.state.searchQuery}
                                onChangeText={this._handleSearch}
                                cancelButtonTitle={'cancel'}
                                clearIcon={{ name: 'cancel', color: '#FFF', style: { fontSize: 24, marginTop: Platform.OS === 'ios' ? responsiveHeight(0.80) : responsiveHeight(1.2) } }}
                                cancelButtonTitle={'Cancel'}
                                containerStyle={{

                                    borderWidth: 0,
                                    justifyContent: 'center',
                                    borderTopColor: 'transparent',
                                    width: responsiveWidth(100),
                                    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
                                    backgroundColor: 'transparent',
                                }}
                                inputStyle={{ 
                                    
                                    color: '#FFF',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'Airbnb-Cereal',
                                    padding: Platform.OS === 'ios' ? responsiveHeight(1.00) : 0,
                                    fontSize: Platform.OS === 'ios' ? responsiveFontSize(4.80) : responsiveFontSize(4.00),
                                    backgroundColor: primaryThemeColor, 
                                    height: Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(8)
                                }}
                                placeholder={'Search...'} />                        
                        </View>
                    }

                    renderContent={
                        
                        <React.Fragment>
                            {
                                filteredAsciiFacesData.length === 0 ? (
                                    <View style={{ alignItems: 'center', backgroundColor: 'transparent', paddingTop: responsiveHeight(5) }}>
                                        <Text style={{ color: '#FFF', fontSize: Platform.OS === 'ios' ? responsiveFontSize(4.00) : responsiveFontSize(3.60), fontFamily: 'Airbnb-Cereal' }}>No art found</Text>
                                    </View>
                                ) : (
                                    <GridView
                                        items={filteredAsciiFacesData}
                                        spacing={16}
                                        itemDimension={responsiveHeight(20)}
                                        style={{ backgroundColor: primaryBackgroundColor }}
                                        renderItem={ascii => this._renderList(ascii)}
                                    />
                                )
                            }
                        </React.Fragment>
                            
                        } />

                <DropdownAlert
                    closeInterval={1000} ref={ref => this.dropdown = ref}
                    inactiveStatusBarStyle={'light-content'}
                    successImageSrc={'https://png.icons8.com/copy/FFFFFF'}
                    defaultContainer={{ padding: 8, flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}
                    titleStyle={{ fontSize: 20, textAlign: 'left', color: 'white', fontFamily: 'Airbnb-Cereal', backgroundColor: 'transparent' }} 
                    messageStyle={{ fontSize: 16, textAlign: 'left', color: 'white', fontFamily: 'Airbnb-Cereal', backgroundColor: 'transparent' }} />
            </View>
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryBackgroundColor, 
    }
});

export default MainScreen;
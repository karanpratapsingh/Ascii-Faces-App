import React, { Component } from 'react';
import { 
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import { Constants } from 'expo';
// import Faces from '../data/faces.json';
import Faces from '../data/ascii-faces-data.json';
import AppStyle from '../styles/AppStyles';
import { SearchBar } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Collapsible from 'react-native-collapsible-header';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

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


    };
    
    _renderList = (ascii) => {

        let { art } = ascii;

        return (
            <TouchableBounce onPress={() => this._copyToClipboard(art)} style={{ alignItems: 'center', justifyContent: 'center', height: responsiveHeight(20), borderRadius: 10, backgroundColor: primaryThemeColor }}>
                <Text style={{ color: '#FFF', fontSize: responsiveFontSize(3.60) }}>{art}</Text>
            </TouchableBounce>
        );
    };

    render() {

        const items = [
            { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
            { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
            { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
            { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
            { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
            { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
            { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
            { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
            { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
            { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
        ];

        let { searchQuery } = this.state;

        // let filteredAsciiData = [...Faces].filter(ascii => {

        //     let { name } = ascii;

        //     if (searchQuery === '') return ascii;
        //     else if (name
        //         .toLowerCase()
        //         .includes(searchQuery.toLowerCase())) return ascii;

        // });

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'transparent'}
                    barStyle={'light-content'}
                />
                <Collapsible
                    backgroundColor={primaryBackgroundColor}
                    min={Constants.statusBarHeight}
                    max={responsiveHeight(10)}
                    renderHeader={
                        <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, flexDirection: 'row' }}>
                            {/* <Text style={{ color: '#FFF', fontSize: responsiveFontSize(4.50), fontFamily: 'Airbnb-Cereal' }}>Ascii Faces</Text> */}
                            <SearchBar
                                noIcon
                                lightTheme
                                platform={'ios'}
                                value={this.state.searchQuery}
                                onChangeText={this._handleSearch}
                                cancelButtonTitle={'cancel'}
                                clearIcon={{ name: 'cancel', color: '#FFF', style: { fontSize: 24, marginTop: responsiveHeight(0.8) } }}
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
                                    fontFamily: 'Airbnb-Cereal',
                                    padding: responsiveHeight(1.00),
                                    fontSize: responsiveFontSize(4.80),
                                    backgroundColor: primaryThemeColor, 
                                    height: responsiveHeight(8)
                                }}
                                placeholder={'Search...'} />                        
                        </View>
                    }

                    renderContent={
                            <GridView
                                items={Faces}
                                spacing={16}
                                itemDimension={responsiveHeight(20)}
                                style={{ backgroundColor: primaryBackgroundColor }}
                                renderItem={ascii => this._renderList(ascii)}
                            />
                        } />
            </View>
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        // padding: 10,
        // backgroundColor: '#13194D',
        backgroundColor: primaryBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainScreen;
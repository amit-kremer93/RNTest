/**
 * https://github.com/AppsFlyerSDK/appsflyer-react-native-plugin/archive/6.1-noidfa.tar.gz
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Node, useEffect, useState} from 'react';
import appsFlyer from 'react-native-appsflyer';

import {
    Button,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform,
    Alert
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';


const App: () => React$Node = () => {
    const [isDDL, setIsDDL] = useState('no ddl triggered');

    useEffect(() => {
        console.log('useEffect');
        return () => {
            // Optionaly remove listeners for deep link data if you no longer need them after componentWillUnmount
            if (onInstallConversionDataCanceller) {
                onInstallConversionDataCanceller();
                console.log('unregister onInstallConversionDataCanceller');
                onInstallConversionDataCanceller = null;
            }
            if (onAppOpenAttributionCanceller) {
                onAppOpenAttributionCanceller();
                console.log('unregister onAppOpenAttributionCanceller');
                onAppOpenAttributionCanceller = null;
            }
            // if (onDeepLinkCanceller) {
            //     onDeepLinkCanceller();
            //     console.log('unregister onDeepLink');
            //     onDeepLinkCanceller = null;
            // }
        };
    }, []);

    var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
        (res) => {
            Alert.alert("GCD", JSON.stringify(res));
            console.log('onInstallConversionData: ' + JSON.stringify(res));
            if (res.type === 'onInstallConversionDataLoaded') {
                if (!JSON.parse(res.data.is_first_launch) === true) {
                    if (!res.data.af_status === 'Non-organic') {
                        const media_source = res.data.media_sourceh;
                        const campaign = res.data.campaign;
                        setIsDDL('This is NOT first launch and a Non-Organic install. Media source: ' +
                            media_source +
                            ' Campaign: ' +
                            campaign);
                        console.log(
                            'This is NOT first launch and a Non-Organic install. Media source: ' +
                            media_source +
                            ' Campaign: ' +
                            campaign,
                        );
                    } else if (res.data.af_status === 'Organic') {
                        console.log('This is NOT first launch and a Organic Install');
                    }
                } else {
                    if (res.data.af_status === 'Non-organic') {
                        var media_source = res.data.media_source;
                        var campaign = res.data.campaign;
                        setIsDDL('This is first launch and a Non-Organic install. Media source: ' +
                            media_source +
                            ' Campaign: ' +
                            campaign);
                        console.log(
                            'This is first launch and a Non-Organic install. Media source: ' +
                            media_source +
                            ' Campaign: ' +
                            campaign,
                        );
                    } else if (res.data.af_status === 'Organic') {
                        console.log('This is first launch and a Organic Install');
                    }
                }
            }
        },
    );

// eslint-disable-next-line no-unused-vars
    var onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution((res) => {
        Alert.alert("OAOA", JSON.stringify(res));
        console.log('OAOA called');
        console.log(res);
    });

    // var onAppOpenAttributionFailCanceller = appsFlyer.onAttributionFailure((res) => {
    //     Alert.alert("OAOA Failure", JSON.stringify(res));
    //     console.log('OAOA Failure');
    //     console.log(res);
    // });

    var onDeepLinkCanceller = appsFlyer.onDeepLink(res => {
        Alert.alert("DDL", JSON.stringify(res));
        console.log('onDeepLinking:');
        console.log(res);
    });

    const option = {
        isDebug: true,
        devKey: 'Us4Gm2SnJghcuoev846Qed',
        appId: '741993991',
        onInstallConversionDataListener: true,
        // onDeepLinkListener: true,
    };
    if (Platform.OS == 'iOS') {
        // appsFlyer.disableAdvertisingIdentifier(true);
        // appsFlyer.disableCollectASA(true);
    }
    appsFlyer.initSdk(option, (result) => {
            console.log('initSdk: ' + result);
            if (Platform.OS === 'android') {
                appsFlyer.setCollectAndroidID(true);
            }
        },
        (error) => {
            console.error('initSdk: ' + error);
        });

    const logEvent = () => {
        const eventName = 'af_6.1_latest';
        const eventValues = {
            'af_content_id': 'id123',
            'af_currency': 'ILS',
            'af_content_type': 'shoes',
            'af_price': 5,
        };
        appsFlyer.logEvent(
            eventName,
            eventValues,
            (result) => {
                console.log('logEvent: ' + result);
            },
            (error) => {
                console.error('logEvent: ' + error);
            },
        );
    };


    const logInAppPurchase = () => {
        let info = {};

        if (Platform.OS == 'android') {
            info = {
                publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoX41niML7DAqFV8hf2XZGHArVVyof+rb6gKqxlekE4dWcHJ6kRTvH0b1B2tWuQoDyuhCm8VYR5D8rjfwia8Jjnc3GVg0Fya2svEelsYtjW45q6AxSW0z96e4CyfnQapvvnVozzwcUzyBeobpKgs66P9PTpS/b6WDjMtoSnrJyFkI2/kcOY4Aoep7g0soLdVaub0V7RN/B4UXp3Jg4FT9VWEho3I0E52yCY4chN6fNthXnw28h09VmFqh7KQK2TIPzlYi9hhNIK2CjoyQ5GBjTIslrRa17yFwk7PH4CCcB83h5qOu6Q6RF+hHl2dzXqMaxUdaCwtFUgkHoU5vSf6BeQIDAQAB',
                currency: 'buz',
                signature: 'eYZlK78ydQ2S+Dh02EPK+4ZcorwTAQ+3n2pBi3dXyRClUsiBaaxugrG08ODlRHardNSscmjazHa4jWZ+X4dODi4IaftzDtZvb6vVVn+6uZLVAunU+yG4Ne7lL0KCZiM4PdTmelvHJR+XdTc8f7UHAOEvehrRxySGdInavCO0Cl044QjSe6807wQUR63RskjT4p6JICSi+ZT/JrVfUMQkw/3z4Yr9ZNETGb3NIKjG5O/hIQdiQvAJGGy1KHVkz3nXTuihCz4Gt7PwFERdJgFBf9EicmY0vriVnsxsdSsozBouRBxaC9/puBtADpiD7NLWLru0g/Eg03ZYQfSx12LNiw==',
                purchaseData: '{"orderId":"GPA.3387-9329-9810-84544","packageName":"com.playgendary.creamaster","productId":"com.playgendary.creamaster.iap.noads","purchaseTime":1598858034023,"purchaseState":0,"developerPayload":"{\\"appsflyer_id\\":\\"1594326954605-8916792962997971478\\",\\"advertising_id\\":\\"f6437916-a988-485e-bf97-f7fdde0124d7\\",\\"app_version\\":\\"1.11.2\\",\\"os_version\\":\\"7.1.1\\"}","purchaseToken":"malnpapnhnfefelbobbaieip.AO-J1OyXadcBhDaoZVoTUNVvkxy5vHrPmZ-o26oBhT9y4RYx_a8Ros1dvygkJ-MXCQ1p7CjdrQpl7r8PBxvQhM0IWz24ZwNLYSJNf46OklYU1T-NwkqJ04kITzzglqdhsLeFq9ROe8dnEX5l8o_IbbmwNoY0fphkPcb1VX_2-0My3ZnUzpmKuO0"}',
                price: '123',
                additionalParameters: {'amit': 'la'},
            };
        } else if (Platform.OS == 'ios') {
            appsFlyer.setUseReceiptValidationSandbox(true);
            info = {
                productIdentifier: 'com.appsflyer.inapppurchase.one1',
                currency: 'USD',
                transactionId: '1000000614252747',
                price: '0.99',
                additionalParameters: null,
            };

        }
        appsFlyer.validateAndLogInAppPurchase(info, res => console.log(res), err => console.log(err));
    };

    const init = () => {
        appsFlyer.initSdk(option, result => console.log('initSdk: ' + result), error => console.log('initSdk: ' + result));
    };

    const LogLocationPressed = () => {
        // appsFlyer.logLocation(32.0853, 34.781769, (result) => {
        //     console.log('logLocation: ' + result);
        // });
        appsFlyer.logLocation('32.0853', '34.781769');
        // appsFlyer.logLocation(null, "34.781769");
    };

    const StopPressed = () => {
        // appsFlyer.stop(true);
        appsFlyer.stop(true, res => console.log(res));
    };

    const LogCrossPromotion = () => {
        appsFlyer.logCrossPromotionImpression('456789456', 'test', {
            custom_param: 'custom_value',
        });
    };

    const logCrossPromotionAndOpenStore = () => {
        appsFlyer.logCrossPromotionAndOpenStore('1192323960', 'test', {
            custom_param: 'custom_value',
        });
    };

    const anonymizeUser = () => {
        // appsFlyer.anonymizeUser(true);
        appsFlyer.anonymizeUser(true, (res) => {
            console.log('anonymizeUser: ' + res);
        });
    };
    const setCustomerId = () => {
        appsFlyer.setCustomerUserId(9544555, res => console.log('Customer id: ' + res));
        // appsFlyer.setCustomerUserId(null);
    };
    const disableIDFA = () => {
        appsFlyer.disableAdvertisingIdentifier(true);
    };
    const sendPushNotifications = () => {
        const pushPayload = {
            af: {
                c: 'test_campaign',
                is_retargeting: true,
                pid: 'push_provider_int',
            },
            aps: {
                alert: 'Get 5000 Coins',
                badge: '37',
                sound: 'default',
            },
        };
        appsFlyer.sendPushNotificationData(pushPayload);
    };

    const addPushNotificationDeepLinkPath = () => {
        let path = ['amit', 'is', 'the', 'king'];
        appsFlyer.addPushNotificationDeepLinkPath(path, res => console.log(res), error => console.log(error));

    };

    const Header = (): Node => (
        <ImageBackground style={styles.background} imageStyle={styles.logo}>
            <Text style={styles.text}>
                React Native AppsFlyer Test App!
            </Text>
            <Text>
                {isDDL}
            </Text>
        </ImageBackground>
    );

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header/>
                    <View style={styles.body}>
                        <Text style={styles.welcome}>Press to test receipt validation!</Text>
                        <Button
                            onPress={logInAppPurchase}
                            title="receipt validation"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>Press to init SDK!</Text>
                        <Button
                            onPress={init}
                            title="init SDK"
                            color="#009688"
                        />

                        <Text style={styles.welcome}>Press to log location!</Text>
                        <Button
                            onPress={LogLocationPressed}
                            title="Log Location"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>Press to log event!</Text>
                        <Button
                            onPress={logEvent}
                            title="Log Event"
                            color="#009688"
                        />

                        <Text style={styles.welcome}>Press to stop AF SDK!</Text>
                        <Button
                            onPress={StopPressed}
                            title="Stop SDK"
                            color="#009688"/>

                        <Text style={styles.welcome}>
                            Press to Log cross promotion impression!
                        </Text>
                        <Button
                            onPress={LogCrossPromotion}
                            title="Log cross promotion impression"
                            color="#009688"
                        />

                        <Text style={styles.welcome}>Press to Log and open Store!</Text>
                        <Button
                            onPress={logCrossPromotionAndOpenStore}
                            title="Log and open Store"
                            color="#009688"
                        />

                        <Text style={styles.welcome}>Press to anonymize user!</Text>
                        <Button
                            onPress={anonymizeUser}
                            title="Anonymize user"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>Set Customer ID!</Text>
                        <Button
                            onPress={setCustomerId}
                            title="Set Customer ID"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>Send Push Notifications</Text>
                        <Button
                            onPress={sendPushNotifications}
                            title="Send Push Notifications"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>Disable IDFA</Text>
                        <Button
                            onPress={disableIDFA}
                            title="Disable IDFA"
                            color="#009688"
                        />
                        <Text style={styles.welcome}>addPushNotificationDeepLinkPath</Text>
                        <Button
                            onPress={addPushNotificationDeepLinkPath}
                            title="addPushNotificationDeepLinkPath"
                            color="#009688"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    background: {
        paddingBottom: 40,
        paddingTop: 96,
        paddingHorizontal: 32,
        backgroundColor: Colors.lighter,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        /*
         * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
         *
         * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
         * source image's size.
         */
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
    },
});

export default App;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

const Favourite = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>favourite</Text>
        </View>
    )
}

export default Favourite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    text: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.md
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '@/common/MainContainer'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

const Explore = () => {
    return (
        <MainContainer style={{ backgroundColor: Colors.primary }}>
            <Text style={{
                color: Colors.white,
                fontFamily: Fonts.primary,
                fontSize: Fonts.sizes.md
            }}>explore</Text>
        </MainContainer>
    )
}

export default Explore

const styles = StyleSheet.create({
    text: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.md
    }
})
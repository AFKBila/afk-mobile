import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '@/common/MainContainer'
import { Colors } from '@/constants/Colors'

const Explore = () => {
    return (
        <MainContainer style={{ backgroundColor: Colors.primary }}>
            <Text style={{ color: Colors.white }}>explore</Text>
        </MainContainer>
    )
}

export default Explore

const styles = StyleSheet.create({})
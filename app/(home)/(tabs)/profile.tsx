import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import MainContainer from '@/common/MainContainer'

const Profile = () => {
    return (
        <MainContainer style={{ backgroundColor: Colors.primary }}>
            <Text style={{ color: Colors.white }}>profile</Text>
        </MainContainer>
    )
}

export default Profile

const styles = StyleSheet.create({})
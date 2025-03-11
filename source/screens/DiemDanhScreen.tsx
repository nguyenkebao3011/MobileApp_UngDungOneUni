import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const DiemDanhScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>DiemDanhScreen</Text>
      </View>
    </SafeAreaView>

  )
}

export default DiemDanhScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Đẩy nội dung xuống dưới để tránh trùng vào viền trên
  },

})
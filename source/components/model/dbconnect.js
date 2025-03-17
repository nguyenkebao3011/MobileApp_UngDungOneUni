import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
export default class dbconnect extends React.Component {
  //1. Khoi tao
  constructor() {
    super();
    this.state = {
      dataTaiKhoan: [],
    };
  }
  //Su dung Post de insert du lieu
  dinhNghiaPost() {
    var url = 'http://192.168.0.123:3000/data';
    axios
      .post(url, {
        MaTaiKhoan: this.state.input1,
        TaiKhoanDangNhap: this.state.input2,
        MatKhau: this.state.input3,
        LoaiTaiKhoan: this.state.input4,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    //reset lai du lieu
    this.state.input1 = '';
    this.state.input2 = '';
    this.state.input3 = '';
    this.state.input4 = '';
  }
  //ding nghia get (su dung select du lieu)
  dinhNghiaGet() {
    var url = 'http://192.168.0.123:3000/data';
    axios
      .get(url)
      .then(gData => {
        console.log(gData.data);
        this.setState({
          dataTaiKhoan: gData.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    //Lay du lieu cho view???
    const dataMySql = this.state.dataTaiKhoan.map((item, index) => {
      var dsTaiKhoan = ['MaTaiKhoan: ', item.MaTaiKhoan];
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

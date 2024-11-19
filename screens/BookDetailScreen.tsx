import React, { useState, useEffect } from 'react';
import { Image, View, SafeAreaView, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Header from '../components/Header';
import CustomText from '../components/CustomText';
import CustomButton from '@/components/CustomButton';
import colors from '@/styles/colors';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../FirebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: Props) => {
  const { bookId } = route.params;

  // State to hold the book data and loading state
  const [bookData, setBookData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch book data when the component mounts
  useEffect(() => {
    const db = getDatabase(app);
    const bookRef = ref(db, `books/${bookId}`);

    get(bookRef).then((snapshot) => {
      if (snapshot.exists()) {
        setBookData(snapshot.val());
      } else {
        console.log("No data available");
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });
  }, [bookId]);

  // If still loading, show a loading spinner
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.black} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header headerName="Book Details" previousPage="Landing" bgColor={colors.white} />

      {/* Display book details */}
      {bookData ? (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.bookDetailsContainer}>
            <View style={{ height: 395, backgroundColor: colors.lightGray, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: bookData.Thumbnail }}
                style={{ width: 230, height: '90%' }}
              />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.darkGray, paddingVertical: 15, gap: 2 }}>
              <CustomText fontSize={31} fontWeight='medium'>{bookData.Title}</CustomText>
              <View style={styles.subDetailCon}>
                <CustomText fontSize={30} style={{ color: colors.darkPurple }}>฿​ {bookData.Price}</CustomText>
                <CustomText fontSize={20} style={{ color: colors.black }}>
                  <FontAwesome name="star" size={24} color={colors.yellow} />
                  {" "}
                  {bookData.Rating} Rating</CustomText>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.darkGray, paddingVertical: 15, gap: 2, marginBottom: 15 }}>
              <View style={styles.subDetailCon}>
                <CustomText style={{ fontSize: 14, color: colors.whiteGray }}>Author</CustomText>
                <CustomText fontSize={14}>{bookData.Author}</CustomText>
              </View>
              <View style={styles.subDetailCon}>
                <CustomText style={{ fontSize: 14, color: colors.whiteGray }}>ISBN</CustomText>
                <CustomText fontSize={14}>{bookData.ISBN}</CustomText>
              </View>
              <View style={styles.subDetailCon}>
                <CustomText style={{ fontSize: 14, color: colors.whiteGray }}>Publisher</CustomText>
                <CustomText fontSize={14}>{bookData.Publisher}</CustomText>
              </View>
              <View style={styles.subDetailCon}>
                <CustomText style={{ fontSize: 14, color: colors.whiteGray }}>Stock</CustomText>
                <CustomText fontSize={14}>{bookData.Amount}</CustomText>
              </View>
            </View>
            <View style={{marginBottom: 30}}>
              <CustomText fontSize={20} fontWeight='mediumItalic' style={{ color: colors.darkPurple, marginBottom: 8 }}>Description</CustomText>
              <CustomText>{bookData.Description}</CustomText>
            </View>
          </ScrollView>
          <CustomButton 
            text='Add to Cart'
            onPress={() => console.log("details add")}
            disabled={ bookData.Amount <= 0}/>
        </View>
      ) : (
        <CustomText>Book data not available.</CustomText>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  bookDetailsContainer: {
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  subDetailCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default BookDetailScreen;

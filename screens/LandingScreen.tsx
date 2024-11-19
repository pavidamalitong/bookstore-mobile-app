import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Feather from '@expo/vector-icons/Feather';

import CustomText from '@/components/CustomText';
import colors from '@/styles/colors';
import CartButton from '@/components/CartButton';

import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../FirebaseConfig'


type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = ({ navigation }: Props) => {

  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const db = getDatabase(app);
    const booksRef = ref(db, 'books');

    // Fetch data from Firebase Realtime Database
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const booksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setBooks(booksArray);
      }
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredBooks = books.filter((book) => {
    const { Title, Author, Publisher, ISBN } = book;
    const query = searchQuery.toLowerCase();

    return (
      String(Title).toLowerCase().includes(query) ||
      String(Author).toLowerCase().includes(query) ||
      String(Publisher).toLowerCase().includes(query) ||
      String(ISBN).toLowerCase().includes(query)
    );
  });



  return (
    <SafeAreaView style={styles.container}>
      {/* Banner section */}
      <View>
        <View style={styles.banner_top}>
          <CustomText fontSize={30} style={{ color: colors.black }}>Bonjour!</CustomText>
          <View style={{ flexDirection: 'row', gap: 7 }}>
            <CartButton bg_color={colors.white} border_color={colors.black} onPress={() => navigation.navigate('Cart')} />
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Login')}>
              <Feather name="log-out" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={require('../assets/banner.png')} />
      </View>

      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={colors.darkGray} />
        <TextInput
          placeholder='Search'
          style={styles.searchBox}
          clearButtonMode='always'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </View>

      {/* Book Card List Section with FlatList */}
      <FlatList
        style={styles.bookCardCon}
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCardBox}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          >
            <Image
              source={{ uri: item.Thumbnail }}
              style={{ width: 80, height: '100%', borderRadius: 10 }}
            />

            {/* Book Details */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '75%' }}>
                  <CustomText fontWeight="medium" style={{ color: colors.black }}>
                    {item.Title}
                  </CustomText>
                  <CustomText fontSize={13}>{item.Author}</CustomText>
                  <CustomText fontSize={10} style={{ color: colors.whiteGray }}>
                    Publisher: {item.Publisher}
                  </CustomText>
                  <CustomText fontSize={10} style={{ color: colors.whiteGray }}>
                    ISBN: {item.ISBN}
                  </CustomText>
                </View>
                <CustomText fontSize={14} style={{ color: colors.yellow }}>
                  <Feather name="star" size={14} color={colors.yellow} />
                  {" "}
                  {item.Rating}
                </CustomText>
              </View>

              {/* Selling Details */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.Amount > 0 ? (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                      <CustomText fontSize={25} style={{ color: colors.black }}>
                        ฿ {item.Price}
                      </CustomText>
                      <CustomText fontSize={13} style={{ color: colors.whiteGray }}>
                        Stock: {item.Amount}
                      </CustomText>
                    </View>
                    <CartButton
                      bg_color={colors.lightGray}
                      border_color={colors.darkPurple}
                      onPress={() => console.log('click cart', item.Title)}
                    />
                  </>
                ) : (
                  <CustomText fontSize={15} style={{ color: colors.red, paddingVertical: 5 }}>
                    Out of Stock
                  </CustomText>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingStart: 20,
    paddingEnd: 20
  },
  banner_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    marginBottom: 10
  },
  iconBtn: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 15,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10
  },
  searchBox: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 19
  },
  bookCardCon: {
    flex: 1,
    width: '100%',
  },
  bookCardBox: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10
  }
});

export default LandingScreen;

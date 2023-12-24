import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';

import axios from 'axios';

type UserData = {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
};

function App(): React.JSX.Element {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get<UserData[]>(
        'https://random-data-api.com/api/users/random_user?size=80',
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderUserData = () => {
    if (!userData.length) return null;

    const user = userData[currentIndex];
    const displayKeys: Array<keyof UserData> = [
      'uid',
      'id',
      'username',
      'first_name',
      'last_name',
      'email',
      'password',
    ];
    const displayLabels: {[key in keyof UserData]: string} = {
      uid: 'UID',
      id: 'ID',
      username: 'Username',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
      avatar: 'Avatar',
    };

    return displayKeys.map(key => (
      <View key={key} style={styles.RectangleShapeView}>
        <Text style={styles.headText}>{displayLabels[key]}:</Text>
        <Text style={styles.subjectText}>{String(user[key])}</Text>
      </View>
    ));
  };

  const handleNext = () => {
    if (currentIndex < userData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(userData.length - 1);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView
        style={{
          backgroundColor: '#5ac7fa',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri:
                userData[currentIndex].avatar ||
                'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png',
            }}
            resizeMode="contain"
            style={{
              height: 125,
              width: 125,
              borderRadius: 999,
              borderColor: '#000000',
              borderWidth: 2,
            }}
          />
        </View>
        <View style={styles.userDataSection}>{renderUserData()}</View>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.btn} onPress={handlePrevious}>
            <Text style={styles.text}>Previous</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={handleNext}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
  },
  userDataSection: {
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headText: {
    fontFamily: 'Helvetica',
    color: 'grey',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
  },
  subjectText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Helvetica',
    marginLeft: 20,
    marginTop: 5,
  },
  RectangleShapeView: {
    marginTop: 10,
    width: '100%',
    height: 65,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    paddingLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 3,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  passwordInputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    margin: 10,
  },
  btn: {
    backgroundColor: '#3B525F',
    borderRadius: 10,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default App;

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

// Type for the userData from the random-data-API
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

  // Fetch the data from the random-api
  const fetchUserData = async () => {
    try {
      const response = await axios.get<UserData[]>(
        'https://random-data-api.com/api/users/random_user?size=80',
      ); // store the response
      setUserData(response.data); // set the userData from the respose of API
    } catch (error) {
      console.error('Error fetching user data:', error); // error handling if the response fails
    }
  };

  // Displaying the user data to the screen
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

  // Next User handling
  const handleNext = () => {
    if (currentIndex < userData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // at the last index i.e. 80 set the index to 0
    }
  };

  // Previous User handling
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(userData.length - 1); // at the first index i.e. 1 set the index to 80
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
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {currentIndex + 1}/{userData.length}
          </Text>
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          {/* Image is sourced from userData[currentIndex].avatar if the value is null then set a default profile image */}
          <Image
            source={{
              uri:
                userData[currentIndex]?.avatar.split('?')[0] ||
                'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png',
            }}
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
              borderRadius: 999,
              borderColor: '#000000',
              borderWidth: 3,
            }}
          />
        </View>
        {/* UserDataSection id, uid, firstName, lastName, email, password, userName */}
        <View style={styles.userDataSection}>{renderUserData()}</View>
        {/* The next and previous buttons with methods to handle the working */}
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

// Style of the elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
  },
  counterContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#003259',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
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
    marginLeft: 10,
    marginTop: 10,
  },
  subjectText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Helvetica',
    marginLeft: 10,
  },
  RectangleShapeView: {
    marginTop: 10,
    width: '100%',
    height: 65,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 55,
    paddingLeft: 15,
    borderColor: '#003259',
    borderWidth: 2,
    elevation: 3,
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
    backgroundColor: '#003259',
    borderRadius: 100,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default App;

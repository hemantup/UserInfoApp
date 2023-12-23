import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

import axios from 'axios';

type UserData = {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  Username: string;
  email: string;
  Avatar: string;
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
      'Username',
      'first_name',
      'last_name',
      'email',
      'password',
    ];
    const displayLabels: {[key in keyof UserData]: string} = {
      uid: 'UID',
      id: 'ID',
      Username: 'Username',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
      Avatar: 'Avatar',
    };
    const avatarUrl = user.Avatar
      ? user.Avatar.split('?')[0]
      : 'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png';

    return displayKeys.map(key => (
      <View key={key} style={styles.inputRow}>
        <Text style={styles.label}>{displayLabels[key]}:</Text>
        <TextInput
          style={styles.input}
          value={String(user[key])}
          editable={false}
        />
      </View>
    ));
  };

  const handleNext = () => {
    if (currentIndex < userData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar />
        <View style={styles.formContainer}>
          <View style={styles.topSection}>
            {userData.length > 0 && (
              <Image
                source={{
                  uri:
                    userData[currentIndex].Avatar?.split('?')[0] ||
                    'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png',
                }}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.userDataSection}>{renderUserData()}</View>
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePrevious}
              disabled={currentIndex === 0}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userDataSection: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;

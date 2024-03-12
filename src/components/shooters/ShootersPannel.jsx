import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import {Image} from 'react-native-elements';
//import userImage from '../../assets/images/user-image.jpeg';
import GlobalStyles from '../../styles/GlobalStyle';
//import {getShooters} from '../../db/dbFunctions/shooters';
//import ShooterModal from './ShooterModal';

const ShootersPannel = () => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.title}>PROXIMAMENTE...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/* const [modalVisible, setModalVisible] = useState(false);
  const [selectedShooter, setSelectedShooter] = useState();
  const [shooters, setShooters] = useState([]);

  const getAllShooters = async () => {
    const data = await getShooters();
    if (data.status === 200) {
      const allShooters = data.data;
      allShooters.sort((a, b) => a.name.localeCompare(b.name));
      setShooters(allShooters);
    }
  };

  useEffect(() => {
    getAllShooters();
  }, []);

  useEffect(() => {}, [shooters]);
  return (
    <View style={GlobalStyles.panelComponentContainer}>
      <View style={styles.titleContainer}>
        <Text style={GlobalStyles.panelComponentTitle}>
          Gestionar tiradores
        </Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={GlobalStyles.panelComponentSubTitle}>Tiradores</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        indicatorStyle={'black'}
        showsVerticalScrollIndicator={true}>
        <View style={GlobalStyles.userListContainer}>
          {shooters.map((shooter, index) => (
            <View key={index} style={GlobalStyles.userListRow}>
              <Image source={userImage} style={GlobalStyles.userListImg} />
              <View style={GlobalStyles.userListDataColumn}>
                <Text style={GlobalStyles.userListName}>
                  {shooter.name} {shooter.lastName}
                </Text>
                <Text style={GlobalStyles.userListDetail}>{shooter.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedShooter(shooter);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={GlobalStyles.userListName}>...</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <ShooterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedShooter={selectedShooter}
        getAdmins={getAllShooters}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={() => {
            setSelectedShooter();
            setModalVisible(!modalVisible);
          }}>
          <Text style={GlobalStyles.primaryButtonText}>Nuevo Tirador</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {alignItems: 'center'},
  subTitleContainer: {paddingVertical: 36},
  scrollView: {maxHeight: 430},
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: neutral50,
    padding: 30,
    alignItems: 'center',
    borderRadius: 8,
    width: 564,
    height: 390,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 24,
    gap: 20,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
}); */
export default ShootersPannel;

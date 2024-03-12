import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native-elements';
import userImage from '../../assets/images/user-image.jpeg';
import GlobalStyles, {neutral50} from '../../styles/GlobalStyle';
import {getUsers} from '../../db/dbFunctions/users';
import AdminModal from './AdminModal';

const AdminsPannel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

  const getAdmins = async () => {
    const data = await getUsers();
    if (data.status === 200) {
      const allUsers = data.data;
      allUsers.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(allUsers);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  useEffect(() => {}, [users]);
  return (
    <View style={GlobalStyles.panelComponentContainer}>
      <View style={styles.titleContainer}>
        <Text style={GlobalStyles.panelComponentTitle}>
          Gestionar administradores
        </Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={GlobalStyles.panelComponentSubTitle}>Administradores</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        indicatorStyle={'black'}
        showsVerticalScrollIndicator={true}>
        <View style={GlobalStyles.userListContainer}>
          {users.map((user, index) => (
            <View key={index} style={GlobalStyles.userListRow}>
              <Image source={userImage} style={GlobalStyles.userListImg} />
              <View style={GlobalStyles.userListDataColumn}>
                <Text style={GlobalStyles.userListName}>
                  {user.name} {user.lastName}
                </Text>
                <Text style={GlobalStyles.userListDetail}>{user.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedUser(user);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={GlobalStyles.userListName}>...</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <AdminModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedUser={selectedUser}
        getAdmins={getAdmins}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={() => {
            setSelectedUser();
            setModalVisible(!modalVisible);
          }}>
          <Text style={GlobalStyles.primaryButtonText}>
            Nuevo Administrador
          </Text>
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
});
export default AdminsPannel;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import ExitIcon from '../../assets/icons/exitIcon.svg';
import GlobalStyles, {neutral50} from '../../styles/GlobalStyle';
import {createUser, updateUser} from '../../db/dbFunctions/users';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyTextInput from '../MyTextInput';

const AdminModal = ({
  modalVisible,
  setModalVisible,
  selectedUser,
  getAdmins,
}) => {
  const emptyForm = {
    name: '',
    lastName: '',
    email: '',
    birth: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    role: '',
    pass: '',
  };
  const [form, setForm] = useState(emptyForm);

  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const newUser = async user => {
    console.log(user);
    const data = await createUser(user);
    return data;
  };

  const handleClose = () => {
    setForm(emptyForm);
    getAdmins();
    setModalVisible(!modalVisible);
  };
  const handleSubmit = async () => {
    if (!form.name || !form.lastName || !form.email || !form.pass) {
      Alert.alert('Por favor, completa los campos requeridos');
    } else {
      try {
        const response = await newUser(form);
        handleClose();
        if (!response.success) {
          Alert.alert('Error', response.message);
        }
      } catch (error) {
        Alert.alert(
          'Ha ocurrido un error al guardar la información. Por favor, inténtelo nuevamente',
          error.message,
        );
      }
    }
  };
  const handleEdit = async () => {
    if (!form.name || !form.lastName || !form.email) {
      Alert.alert('Por favor, completa los campos requeridos');
    } else {
      try {
        console.log(form);
        const response = await updateUser(form.email, form);
        console.log(response);
        handleClose();
      } catch (error) {
        Alert.alert(
          'Ha ocurrido un error al guardar la información. Por favor intente nuevamente',
          error,
        );
      }
    }
  };
  const onChangePicker = (event, selectedDate) => {
    const currentDate = selectedDate || datePickerDate;
    setShowPicker(Platform.OS === 'ios');
    setDatePickerDate(currentDate);
    setForm({...form, birth: currentDate});
  };

  const formatDate = date => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || '',
        lastName: selectedUser.lastName || '',
        email: selectedUser.email || '',
        birth: selectedUser.birth || '',
        phone: selectedUser.phone || '',
        country: selectedUser.country || '',
        city: selectedUser.city || '',
        address: selectedUser.address || '',
      });
    }
  }, [selectedUser]);

  return selectedUser ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>
              {selectedUser.name} {selectedUser.lastName}
            </Text>
            <TouchableOpacity onPress={() => handleClose()}>
              <ExitIcon width={16} height={16} />
            </TouchableOpacity>
          </View>

          <ScrollView
            indicatorStyle={'black'}
            showsVerticalScrollIndicator={true}>
            <View style={GlobalStyles.formContainer}>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Nombre: (*)</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.name ? selectedUser.name : 'Ingresar nombre'
                  }
                  onChangeText={text => setForm({...form, name: text})}
                  value={form.name}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Apellido: (*)</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.lastName
                      ? selectedUser.lastName
                      : 'Ingresar apellido'
                  }
                  onChangeText={text => setForm({...form, lastName: text})}
                  value={form.lastName}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>email: (*)</Text>
                <MyTextInput
                  placeholder={selectedUser.email && selectedUser.email}
                  editable={false}
                  value={form.email}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Fecha de nacimiento:</Text>
                <TouchableOpacity
                  style={styles.maxWidth}
                  onPress={() => setShowPicker(!showPicker)}>
                  <MyTextInput
                    placeholder={
                      selectedUser.birth
                        ? formatDate(selectedUser.birth)
                        : 'Seleccionar fecha'
                    }
                    editable={false}
                    selectTextOnFocus={false}
                    value={form.birth}
                    withoutStyles={true}
                  />
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={datePickerDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangePicker}
                  />
                )}
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Teléfono:</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.phone
                      ? selectedUser.phone
                      : 'Ingresar teléfono'
                  }
                  onChangeText={text => setForm({...form, phone: text})}
                  value={form.phone}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>País:</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.country
                      ? selectedUser.country
                      : 'Ingresar país'
                  }
                  onChangeText={text => setForm({...form, country: text})}
                  value={form.country}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Ciudad:</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.city ? selectedUser.city : 'Ingresar ciudad'
                  }
                  onChangeText={text => setForm({...form, city: text})}
                  value={form.city}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Dirección:</Text>
                <MyTextInput
                  placeholder={
                    selectedUser.address
                      ? selectedUser.address
                      : 'Ingresar dirección'
                  }
                  onChangeText={text => setForm({...form, address: text})}
                  value={form.address}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={GlobalStyles.secondaryButton}
              onPress={() => {
                handleClose();
              }}>
              <Text style={GlobalStyles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyles.primaryButton}
              onPress={() => {
                handleEdit();
              }}>
              <Text style={GlobalStyles.primaryButtonText}>Editar usuario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ) : (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>Crear Usuario</Text>
            <TouchableOpacity onPress={() => handleClose()}>
              <ExitIcon width={16} height={16} />
            </TouchableOpacity>
          </View>

          <ScrollView
            indicatorStyle={'black'}
            showsVerticalScrollIndicator={true}>
            <View style={GlobalStyles.formContainer}>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Nombre: (*)</Text>
                <MyTextInput
                  placeholder={'Ingresar nombre'}
                  onChangeText={text => setForm({...form, name: text})}
                  value={form.name}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Apellido: (*)</Text>
                <MyTextInput
                  placeholder="Ingresar apellido"
                  onChangeText={text => setForm({...form, lastName: text})}
                  value={form.lastName}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>email: (*)</Text>
                <MyTextInput
                  placeholder="Ingresar email"
                  onChangeText={text => setForm({...form, email: text})}
                  value={form.email}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Contraseña: (*)</Text>
                <MyTextInput
                  placeholder="Ingresar contraseña"
                  secureTextEntry
                  onChangeText={text => setForm({...form, pass: text})}
                  value={form.password}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Fecha de nacimiento:</Text>
                <TouchableOpacity
                  style={styles.maxWidth}
                  onPress={() => setShowPicker(!showPicker)}>
                  <MyTextInput
                    placeholder={
                      form.birth ? formatDate(form.birth) : 'Seleccionar fecha'
                    }
                    editable={false}
                    selectTextOnFocus={false}
                    value={form.birth}
                  />
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={datePickerDate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangePicker}
                  />
                )}
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Teléfono:</Text>
                <MyTextInput
                  placeholder="Ingresar teléfono"
                  onChangeText={text => setForm({...form, phone: text})}
                  value={form.phone}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>País:</Text>
                <MyTextInput
                  placeholder="Ingresar país"
                  onChangeText={text => setForm({...form, country: text})}
                  value={form.country}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Ciudad:</Text>
                <MyTextInput
                  placeholder="Ingresar ciudad"
                  onChangeText={text => setForm({...form, city: text})}
                  value={form.city}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Dirección:</Text>
                <MyTextInput
                  placeholder="Ingresar dirección"
                  onChangeText={text => setForm({...form, address: text})}
                  value={form.address}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={GlobalStyles.secondaryButton}
              onPress={() => {
                handleClose();
              }}>
              <Text style={GlobalStyles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={GlobalStyles.primaryButton}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={GlobalStyles.primaryButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: 660,
    height: 541,
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
  maxWidth: {
    width: '100%',
  },
});

export default AdminModal;

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
import DateTimePicker from '@react-native-community/datetimepicker';
import MyTextInput from '../MyTextInput';
import {createShooter, updateShooter} from '../../db/dbFunctions/shooters';

const ShooterModal = ({
  modalVisible,
  setModalVisible,
  selectedShooter,
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
  };
  const [form, setForm] = useState(emptyForm);

  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleClose = () => {
    setForm(emptyForm);
    getAdmins();
    setModalVisible(!modalVisible);
  };
  const handleSubmit = async () => {
    if (!form.name || !form.lastName || !form.email) {
      Alert.alert('Por favor, completa los campos requeridos');
    } else {
      try {
        const response = await createShooter(form);
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
        const response = await updateShooter(form.email, form);
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
    if (selectedShooter) {
      setForm({
        name: selectedShooter.name || '',
        lastName: selectedShooter.lastName || '',
        email: selectedShooter.email || '',
        birth: selectedShooter.birth || '',
        phone: selectedShooter.phone || '',
        country: selectedShooter.country || '',
        city: selectedShooter.city || '',
        address: selectedShooter.address || '',
      });
    }
  }, [selectedShooter]);

  return selectedShooter ? (
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
              {selectedShooter.name} {selectedShooter.lastName}
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
                    selectedShooter.name
                      ? selectedShooter.name
                      : 'Ingresar nombre'
                  }
                  onChangeText={text => setForm({...form, name: text})}
                  value={form.name}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Apellido: (*)</Text>
                <MyTextInput
                  placeholder={
                    selectedShooter.lastName
                      ? selectedShooter.lastName
                      : 'Ingresar apellido'
                  }
                  onChangeText={text => setForm({...form, lastName: text})}
                  value={form.lastName}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>email: (*)</Text>
                <MyTextInput
                  placeholder={selectedShooter.email && selectedShooter.email}
                  editable={false}
                  value={form.email}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Fecha de nacimiento:</Text>
                <TouchableOpacity
                  style={styles.totalWidth}
                  onPress={() => setShowPicker(!showPicker)}>
                  <MyTextInput
                    placeholder={
                      selectedShooter.birth
                        ? formatDate(selectedShooter.birth)
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
                    selectedShooter.phone
                      ? selectedShooter.phone
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
                    selectedShooter.country
                      ? selectedShooter.country
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
                    selectedShooter.city
                      ? selectedShooter.city
                      : 'Ingresar ciudad'
                  }
                  onChangeText={text => setForm({...form, city: text})}
                  value={form.city}
                />
              </View>
              <View style={GlobalStyles.formInput}>
                <Text style={GlobalStyles.formLabel}>Dirección:</Text>
                <MyTextInput
                  placeholder={
                    selectedShooter.address
                      ? selectedShooter.address
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
              <Text style={GlobalStyles.primaryButtonText}>Editar tirador</Text>
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
            <Text style={GlobalStyles.modalTitle}>Crear Tirador</Text>
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
                <Text style={GlobalStyles.formLabel}>Fecha de nacimiento:</Text>
                <TouchableOpacity
                  style={styles.totalWidth}
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
              <Text style={GlobalStyles.primaryButtonText}>Crear</Text>
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
  totalWidth: {
    width: '100%',
  },
});

export default ShooterModal;

import {StyleSheet} from 'react-native';

export const white = '#FFFFFF';
export const neutral50 = '#F8FAFC';
export const neutral100 = '#00000010';
export const neutral200 = '#E2E8F0';
export const neutral300 = '#CBD5E1';
export const neutral400 = '#94A3B8';
export const neutral600 = '#475569';
export const neutral800 = '#1E293B';
export const blue = '#2563EB';
export const red = '#D91414';
export const lightred = '#D9141420';
export const green = '#26AE60';
export const lightgreen = '#26AE6020';
export const orangeYellow = '#F2B600';
export const xanada = '#373933';
export const jet = '#2B2B29';
export const ghostWhite = '#F4F4F9';
export const green2 = '#3EF21199';
export const grey = '#D9D9D9';
export const arrowRed = '#EE0D0D99';
export const darkRed = '#B10000';
export const info = '#003CF2';

const GlobalStyles = StyleSheet.create({
  sidebarContainer: {
    width: 256,
    backgroundColor: orangeYellow + 'B3',
  },
  sidebarProfile: {
    height: 210,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingTop: 10,
    gap: 15,
    borderBottomColor: neutral100,
  },
  sidebarUserImage: {
    height: 85,
    width: 85,
    borderRadius: 50,
  },
  sidebarUserName: {
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: jet,
    letterSpacing: 0.14,
    fontFamily: 'Goldman-Bold',
  },
  sidebarPrimaryOption: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: neutral100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Goldman-Bold',
  },
  sidebarSecondaryOptoin: {
    height: 48,
    backgroundColor: orangeYellow + '99',
    paddingLeft: 32,
    borderBottomWidth: 1,
    borderBottomColor: neutral100,
    justifyContent: 'center',
    fontFamily: 'Goldman-Bold',
  },
  sidebarSelectedOption: {
    backgroundColor: jet + '99',
    color: ghostWhite,
    fontFamily: 'Goldman-Bold',
  },
  sidebarOptionText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    color: neutral800,
    letterSpacing: 0.14,
    fontFamily: 'Goldman-Bold',
  },
  sidebarSelectedOptionText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    color: ghostWhite,
    letterSpacing: 0.14,
    fontFamily: 'Goldman-Bold',
  },
  panelComponentContainer: {
    height: '100%',
    width: '100%',
    paddingBottom: 40,
    paddingRight: 40,
    paddingTop: 60,
    paddingLeft: 60,
  },

  panelComponentTitle: {
    fontSize: 42,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: neutral800,
  },

  panelComponentSubTitle: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: neutral800,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  connectionModalContent: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    borderRadius: 2,
    width: 528,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 24,
    gap: 20,
    justifyContent: 'flex-start',
  },
  disconnectionModalContent: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    borderRadius: 2,
    width: 528,
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 24,
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: neutral800,
    fontFamily: 'Goldman-Regular',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalConnectionBox: {
    width: '100%',
    backgroundColor: white,
    padding: 15,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: neutral300,
  },
  modalConnectionBoxHeader: {
    width: '100%',
  },
  modalConnectionBoxContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalConnectionBoxStatus: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.14,
    color: neutral600,
    fontFamily: 'andalemo',
  },
  modalStatus: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.14,
    color: neutral600,
    fontFamily: 'andalemo',
  },
  userListContainer: {
    gap: 24,
  },
  userListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 12,
  },
  userListDataColumn: {
    alignItems: 'flex-start',
    width: 670,
  },
  userListImg: {
    width: 66,
    height: 66,
    borderRadius: 50,
  },
  userListName: {
    fontSize: 21,
    fontWeight: '400',
    letterSpacing: 0.21,
    color: neutral800,
  },
  userListDetail: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.36,
    color: neutral600,
  },
  formContainer: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  formInput: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
    width: 592,
  },
  formTextInputFocus: {
    width: '100%',
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 8,
    backgroundColor: white,
  },
  title: {
    fontFamily: 'Goldman-Regular',
    color: ghostWhite,
    fontSize: 48,
  },
  subTitle: {
    fontFamily: 'Goldman-Regular',
    color: ghostWhite,
    fontSize: 28,
    marginTop: 32,
    textDecorationLine: 'underline',
  },
  text: {
    color: ghostWhite,
    fontSize: 16,
    fontFamily: 'Goldman-Regular',
  },
  textAndalemo: {
    color: ghostWhite,
    fontSize: 16,
    fontFamily: 'andalemo',
  },
});

export default GlobalStyles;

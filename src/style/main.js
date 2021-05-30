import { StyleSheet } from 'react-native';
import { MAIN_COLOR, BACKGROUND_COLOR } from '../setting';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  mainList: {
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white'
  },
  listView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  listTypeIcon: {
    marginRight: 10
  },
  listTextBlock: {
    flex: 1
  },
  listTitle: {
    marginVertical: 8,
    fontSize: 15,
    fontWeight: 'bold',
  },
  listDescription: {
    fontSize: 12,
    color: 'gray'
  },
  listIcon: {
    paddingHorizontal: 5
  },
  mainButton: {
    width: 200,
    height: 50,
    paddingTop: 10,
    backgroundColor: MAIN_COLOR,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    borderRadius: 50,
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "#FFFFFF",
    textAlignVertical: "center"
  }
});
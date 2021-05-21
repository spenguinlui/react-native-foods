import { StyleSheet } from 'react-native';

const MAIN_COLOR = "#FF9292";
const MAIN_COLOR_2 = "#FFB4B4";
const SECONDARY_COLOR = "#FFDCDC";
const BACKGROUND_COLOR = "#FFE8E8";

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
  },
  header: {
    height: 40,
    flexDirection: 'row',
  },
  seperator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  image: {
    width: 40,
    height: 40
  },
  activeImage: {
    width: 40,
    height: 40,
    backgroundColor: "#000"
  },
  input: {
    borderColor: '#DDD',
    borderWidth: 2,
    width: 200,
    height: 40
  }
});
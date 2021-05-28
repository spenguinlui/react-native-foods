# React Native 練習作品

## 資料來源
[政府資料開放平臺](https://data.gov.tw/dataset/8543)

因為來源的 JSON 資料格式不太會解析，因此是下載 csv 檔，
自己命名各項標題後重新輸出 json 格式。
轉換過程可參考 csv_to_json.rb 檔案 (ruby 2.6.6)

## 主要使用到的相關元件：
* [async-storage](https://github.com/react-native-async-storage/async-storage)
* [bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
* [stack](https://reactnavigation.org/docs/stack-navigator/)
* [swiper](https://github.com/leecade/react-native-swiper)
* [vector-icons(列表)](https://oblador.github.io/react-native-vector-icons/)
* [redux-react-hook(這是套件名稱)](https://github.com/facebookincubator/redux-react-hook)

## 目前測試機型：
* iphone 8
* iphone 12

換機型方法：
    `expo start -c` 然後 `shift + i` 等一會兒才會跳出機型列表
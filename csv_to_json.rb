require 'csv'
require 'json'

data = File.open('./20_2.csv').read
csv_data = CSV.parse(data, :headers => true)
csv_data = csv_data.map{|row| row.to_a.to_h}
json_data = {}

nutrient_content_list = ['分析項分類', '分析項', '含量單位', '每單位含量', '每100克含量', '每單位重', '每單位重含量', '樣本數', '標準差']
# count = 0

# 不用這種方式會讀不到食品分類
csv_data.each do |data|
  # break if count > 3
  # count += 1
  nutrient_content_object = {}
  if json_data[data['整合編號']].nil?
    json_data[data['整合編號']] = {}
    json_data[data['整合編號']][:nutrient_content] = []
    data.each do |key, value|
      key.match(/['整合編號]{4,}/) && json_data[data['整合編號']][:id] = value
      key.match(/['食品分類]{4,}/) && json_data[data['整合編號']][:food_type] = value 
      key.match(/['資料類別]{4,}/) && json_data[data['整合編號']][:data_type] = value
      key.match(/['樣品名稱]{4,}/) && json_data[data['整合編號']][:name] = value
      key.match(/['俗名]{2,}/) && json_data[data['整合編號']][:common_name] = value
      key.match(/['樣品英文名稱]{6,}/) && json_data[data['整合編號']][:en_name] = value
      key.match(/['內容物描述]{5,}/) && json_data[data['整合編號']][:description] = value
      key.match(/['廢棄率]{3,}/) && json_data[data['整合編號']][:abandonment_rate] = value
      key.match(/['每單位重]{4,}/) && json_data[data['整合編號']][:unit_weight] = value
      if nutrient_content_list.include? key
        key.match(/['分析項分類]{5,}/) && nutrient_content_object[:type] = value
        key.match(/['分析項]{3,}/) && nutrient_content_object[:name] = value
        key.match(/['含量單位]{4,}/) && nutrient_content_object[:unit_content] = value
        key.match(/['每單位含量]{5,}/) && nutrient_content_object[:per_content] = value
        key.match(/['每100克含量]{7,}/) && nutrient_content_object[:per_100_content] = value
        key.match(/['每單位重]{4,}/) && nutrient_content_object[:per_weight] = value
        key.match(/['每單位重含量]{6,}/) && nutrient_content_object[:per_weight_content] = value
        key.match(/['樣本數]{3,}/) && nutrient_content_object[:sample_count] = value
        key.match(/['標準差]{3,}/) && nutrient_content_object[:standard_deviation] = value
      end
    end
  else
    data.each do |key, value|
      key.match(/['分析項分類]{5,}/) && nutrient_content_object[:type] = value
      key.match(/['分析項]{3,}/) && nutrient_content_object[:name] = value
      key.match(/['含量單位]{4,}/) && nutrient_content_object[:unit_content] = value
      key.match(/['每單位含量]{5,}/) && nutrient_content_object[:per_content] = value
      key.match(/['每100克含量]{7,}/) && nutrient_content_object[:per_100_content] = value
      key.match(/['每單位重]{4,}/) && nutrient_content_object[:per_weight] = value
      key.match(/['每單位重含量]{6,}/) && nutrient_content_object[:per_weight_content] = value
      key.match(/['樣本數]{3,}/) && nutrient_content_object[:sample_count] = value
      key.match(/['標準差]{3,}/) && nutrient_content_object[:standard_deviation] = value
    end
  end
  json_data[data['整合編號']][:nutrient_content] << nutrient_content_object
  # json_data[data['整合編號']][:food_type] === '魚貝類' && json_data_with_type[:seafood] << json_data[data['整合編號']]
end

json_data_with_type = {
  'fruit': [],  # 水果類
  'prepared_and_other': [],  # 加工調理食品及其他類
  'meat': [],  # 肉類
  'legume': [],  # 豆類
  'milk': [],  # 乳品類
  'fat': [],  # 油脂類
  'nut': [],  # 堅果及種子類
  'egg': [],  # 蛋類
  'seafoods': [],  # 魚貝類
  'mushroom': [],  # 菇類
  'drink': [],  # 飲料類
  'grains': [],  # 穀物類
  'vegetable': [],  # 蔬菜類
  'seasoning': [],  # 調味料及香辛料類
  'starch': [],  # 澱粉類
  'pastry': [],  # 糕餅點心類
  'sugar': [],  # 糖類
  'alga': [], # 藻類
  'undefined': [] # 沒歸類到的(可能是新資料)
}

json_data = json_data.values

json_data.each do |data|
  case data[:food_type]
  when '水果類'
    json_data_with_type[:fruit] << data
  when '加工調理食品及其他類'
    json_data_with_type[:prepared_and_other] << data
  when '肉類'
    json_data_with_type[:meat] << data
  when '豆類'
    json_data_with_type[:legume] << data
  when '乳品類'
    json_data_with_type[:milk] << data
  when '油脂類'
    json_data_with_type[:fat] << data
  when '堅果及種子類'
    json_data_with_type[:nut] << data
  when '蛋類'
    json_data_with_type[:egg] << data
  when '魚貝類'
    json_data_with_type[:seafoods] << data
  when '菇類'
    json_data_with_type[:mushroom] << data
  when '飲料類'
    json_data_with_type[:drink] << data
  when '穀物類'
    json_data_with_type[:grains] << data
  when '蔬菜類'
    json_data_with_type[:vegetable] << data
  when '調味料及香辛料類'
    json_data_with_type[:seasoning] << data
  when '澱粉類'
    json_data_with_type[:starch] << data
  when '糕餅點心類'
    json_data_with_type[:pastry] << data
  when '糖類'
    json_data_with_type[:sugar] << data
  when '藻類'
    json_data_with_type[:alga] << data
  else
    json_data_with_type[:undefined] << data
  end
end

# csv_data.each do |data|
#   new_content = {
#     type: data['分析項分類'],
#     name: data['分析項'],
#     unit_content: data['含量單位'],
#     per_content: data['每單位含量'],
#     per_100_content: data['每100克含量'],
#     per_weight: data['每單位重'],
#     per_weight_content: data['每單位重含量'],
#     sample_count: data['樣本數'],
#     standard_deviation: data['標準差']
#   }
#   if json_data[data['整合編號']].nil?
#     json_data[data['整合編號']] = {
#       food_type: data['食品分類'],
#       data_type: data['資料類別'],
#       id: data['整合編號'],
#       name: data['樣品名稱'],
#       common_name: data['俗名'],
#       en_name: data['樣品英文名稱'],
#       description: data['內容物描述'],
#       abandonment_rate: data['廢棄率'],
#       unit_weight: data['每單位重'],
#       nutrient_content: [new_content]
#     }
#   else
#     json_data[data['整合編號']][:nutrient_content] << new_content
#   end
# end

json_string = json_data_with_type.to_json

File.open('./food_data.json','w') do |f|
  f.puts(json_string)
end
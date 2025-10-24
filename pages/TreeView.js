import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import TreeSelect from 'react-native-tree-select';

const TreeView = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const treeData = [
    {
      id: '1',
      name: 'Electronics',
      children: [
        {
          id: '1-1',
          name: 'Phones',
          children: [
            { id: '1-1-1', name: 'iPhone' },
            { id: '1-1-2', name: 'Samsung' },
            { id: '1-1-3', name: 'Xiaomi' },
          ],
        },
        {
          id: '1-2',
          name: 'Laptops',
          children: [
            { id: '1-2-1', name: 'MacBook' },
            { id: '1-2-2', name: 'Dell' },
            { id: '1-2-3', name: 'HP' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Fashion',
      children: [
        {
          id: '2-1',
          name: 'Men',
          children: [
            { id: '2-1-1', name: 'Shirts' },
            { id: '2-1-2', name: 'Pants' },
          ],
        },
        {
          id: '2-2',
          name: 'Women',
          children: [
            { id: '2-2-1', name: 'Dresses' },
            { id: '2-2-2', name: 'Shoes' },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Books',
      children: [
        { id: '3-1', name: 'Fiction' },
        { id: '3-2', name: 'Non-Fiction' },
        { id: '3-3', name: 'Science' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tree Select Demo</Text>
      </View>

      <View style={styles.treeContainer}>
        <TreeSelect
          data={treeData}
          onClick={(item) => {
            console.log('Clicked:', item);
          }}
          onClickLeaf={(item) => {
            console.log('Leaf clicked:', item);
            setSelectedItems([...selectedItems, item]);
          }}
          isShowTreeId={false}
          selectType="multiple"
          treeNodeStyle={styles.treeNode}
          itemStyle={styles.item}
          leafCanBeSelected={true}
        />
      </View>

      <View style={styles.selectedContainer}>
        <Text style={styles.selectedTitle}>Selected Items:</Text>
        {selectedItems.length > 0 &&
          selectedItems.map((item, index) => (
            <Text key={index} style={styles.selectedItem}>
              {item.item.name || 'Unknown'}
            </Text>
          ))}
      </View>
    </View>
  );
}

export default TreeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  treeContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  treeNode: {
    paddingVertical: 10,
  },
  item: {
    fontSize: 16,
  },
  selectedContainer: {
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    minHeight: 80,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  selectedItem: {
    fontSize: 14,
    marginVertical: 2,
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

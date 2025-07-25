import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/slices/adminSlice';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useNavigation } from '@react-navigation/native';

const columnWidths = {
  userId: 100,
  name: 120,
  email: 220,
  status: 100,
  actions: 150,
};

const UsersScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { width: columnWidths.userId }]} numberOfLines={1}>
          {item._id}
        </Text>
        <Text style={[styles.cell, { width: columnWidths.name }]}>{item.name}</Text>
        <Text style={[styles.cell, { width: columnWidths.email }]}>{item.email}</Text>
        <Text style={[styles.cell, { width: columnWidths.status }]}>
          {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
        </Text>
        <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserDetailsScreen', { userId: item._id })}
          >
            <Text style={styles.link}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.link, { color: '#E5A400' }]}>Suspend</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.reject}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <AdminTemplateHeaderPart name="Users" paddingBottom={20} />
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tableContainer}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                <Text style={[styles.headerCell, { width: columnWidths.name }]}>Name</Text>
                <Text style={[styles.headerCell, { width: columnWidths.email }]}>E-Mail</Text>
                <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
              </View>
              <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                scrollEnabled={false}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No users found.</Text>
                }
              />
            </View>
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  tableContainer: {
    padding: 10,
    backgroundColor: '#F3F3F3',
    margin: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
    color:'black'
  },
  link: {
    color: 'blue',
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

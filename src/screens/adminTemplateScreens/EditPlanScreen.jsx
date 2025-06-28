import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedPlan } from '../../redux/slices/adminSlice';

const EditPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedPlan, selectedPlanMode } = useSelector(state => state.admin);

  const color = selectedPlan?.color || '#34A853';
  const isAddMode = selectedPlanMode === 'add';

  const [planName, setPlanName] = useState(selectedPlan?.title || '');
  const [roi, setRoi] = useState(selectedPlan?.roi || '');
  const [amount, setAmount] = useState(selectedPlan?.amount || '');
  const [duration, setDuration] = useState(selectedPlan?.duration || '');

  const handleSave = () => {
    const payload = isAddMode
      ? { planName, roi, amount, duration }
      : { roi, amount, duration };

    console.log(`${isAddMode ? 'Added' : 'Updated'} Plan:`, payload);
    dispatch(clearSelectedPlan());
    navigation.goBack();
  };

  const handleCancel = () => {
    dispatch(clearSelectedPlan());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminTemplateHeaderPart name='Investment Plans Management' paddingBottom={10} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.cardBox, { borderLeftColor: color }]}>
          <View style={[styles.titleBar, { backgroundColor: color }]}>
            <Text style={styles.titleText}>
              {isAddMode ? 'Add New Plan' : `Edit ${selectedPlan?.title}`}
            </Text>
          </View>

          {isAddMode && (
            <>
              <Text style={styles.label}>Plan Name :</Text>
              <TextInput
                style={styles.input}
                value={planName}
                onChangeText={setPlanName}
                placeholder="e.g. Starter Plan"
              />
            </>
          )}

          <Text style={styles.label}>ROI :</Text>
          <TextInput
            style={styles.input}
            value={roi}
            onChangeText={setRoi}
            placeholder="e.g. 1.5% Daily"
          />

          <Text style={styles.label}>Min Amount :</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="e.g. 500"
          />

          <Text style={styles.label}>Duration :</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g. 3 Days"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>
                {isAddMode ? 'Add Plan' : 'Save Changes'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPlanScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardBox: {
    margin: 16,
    padding: 0,
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    overflow: 'hidden',
  },
  titleBar: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginTop: 4,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});

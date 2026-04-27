import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText]= useState('')
  const [courseGoals, setCourseGoals]=useState([])
  const [editingIndex, setEditingIndex] = useState(null)

  function getInputChanges(enteredText){
    setEnteredGoalText(enteredText)
  }

  function handleSubmit(){
    if (editingIndex !== null) {
      setCourseGoals(currentCourseGoals =>
        currentCourseGoals.map((goal, index) =>
          index === editingIndex ? enteredGoalText : goal
        )
      )
      setEditingIndex(null)
    } else {
      setCourseGoals(currentCourseGoals=>[
        ...currentCourseGoals,
        enteredGoalText
      ])
    }

    setEnteredGoalText('')
  }

  function handleDeleteGoal(indexToDelete) {
    setCourseGoals(currentCourseGoals =>
      currentCourseGoals.filter((_, index) => index !== indexToDelete)
    )
    if (editingIndex === indexToDelete) {
      setEditingIndex(null)
      setEnteredGoalText('')
    }
  }

  function handleEditGoal(indexToEdit) {
    setEnteredGoalText(courseGoals[indexToEdit])
    setEditingIndex(indexToEdit)
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />

      <Text style={styles.title}>Goal Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a goal..."
          placeholderTextColor="#94a3b8"
          value={enteredGoalText}
          onChangeText={getInputChanges}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'UPDATE GOAL' : 'SET GOAL'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {courseGoals.map((goal, index) => (
          <View style={styles.goalItem} key={index}>
            <Text style={styles.listTitle}>{goal}</Text>
            <View style={styles.goalActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditGoal(index)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteGoal(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#0b1220', // deeper modern navy
    paddingHorizontal: 20,
    paddingTop: 60,
    padding:50,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },

  inputContainer: {
    backgroundColor: '#111c33',
    padding: 16,
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1f2a44',
  },

  input: {
    backgroundColor: '#1f2a44',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#22c55e', // green accent instead of blue
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#0b1220',
    fontWeight: 'bold',
    fontSize: 16,
  },

  listContainer: {
    flex: 1,
    backgroundColor: '#111c33',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2a44',
  },

  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161f36',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  goalActions: {
    flexDirection: 'row',
  },

  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    flex: 1,
    marginRight: 12,
  },

  editButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 8,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  emptyText: {
    color: '#64748b',
    fontStyle: 'italic',
  },
});
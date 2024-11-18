import React, { useEffect, useState } from 'react';
import {getTodos, deleteTodo, updateTodo, createTodo } from '../services/TodoService';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        console.log('Fetched Todos:', data); // Log untuk memastikan data ada
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTodos();
  }, []);

  useEffect(() => {
    console.log('Todos state actually updated:', todos);
  }, [todos]);
  

// In TodoScreen.js
const onAddTodo = async (text) => {
  try {
    // Just pass the text directly
    const newTodo = await createTodo({
      todo: text,      // The actual text content
    });
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  } catch (error) {
    console.error('Failed to add todo:', error);
    Alert.alert(
      'Error',
      'Failed to add todo. Please try again.',
      [{ text: 'OK' }]
    );
  }
};

  // Delete a todo
  const onDeleteTodo = async (id) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          } catch (error) {
            console.error('Failed to delete todo:', error);
            Alert.alert('Error', 'Failed to delete todo');
          }
        },
      },
    ]);
  };

  // Toggle todo completion status
  const onToggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await updateTodo(id, { completed: !completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TodoForm onAddTodo={onAddTodo} />
      <TodoList todos={todos} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
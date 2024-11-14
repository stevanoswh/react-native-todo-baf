import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';


export default function TodoScreen() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo= {
      id: Date.now().toString(),
      text: text,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onDeleteTodo={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
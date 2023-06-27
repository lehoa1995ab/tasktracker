import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskFrom.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TaskFrom() {
  const [task, setTask] = useState('');
  const [day, setDay] = useState('');
  const [posts, setPosts] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isReminder, setIsReminder] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3000/posts', {
        task: task,
        day: day,
        isReminder: isReminder
      })
      .then((response) => {
        setPosts([...posts, response.data]);
        setTask('');
        setDay('');
        setIsReminder(false);
      })
      .catch((error) => console.log('Error:', error));
  };
  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log('Error:', error));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/posts/' + id)
      .then(res => {
        if (res.status == 200) {
          alert("Deleted Successfully")
          setPosts(posts.filter(result => result.id !== id))
        } else {
          alert("Failed to delete");
        }
      })
  }
  return (
    <div className='task'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Task Tracker</h2>
        {!isAdd ? (<Button
          as='input'
          type='reset'
          value='Close'
          style={{
            backgroundColor: 'hsl(9, 100%, 49%) ',
            color: 'white',
            border: 'none'
          }}
          onClick={() => setIsAdd(!isAdd)}
        />) : (<Button
          as='input'
          type='reset'
          value='Add'
          style={{
            backgroundColor: 'hsl(120, 100%, 22%) ',
            color: 'white',
            border: 'none'
          }}
          onClick={() => setIsAdd(!isAdd)}
        />)}
      </div>
      {!isAdd ? (<Form className='from' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Task</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Day & Time</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Day & Time'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check label=' Set Reminder' type='checkbox' checked={isReminder} onChange={() => setIsReminder(!isReminder)} />
        </Form.Group>
        <div className='d-grid gap-2'>
          <Button
            variant='primary'
            size='lg'
            style={{
              backgroundColor: 'hsl(0, 0%, 0%)',
              marginBottom: '50px'
            }}
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              if (task !== '' && day !== '') {
                handleSubmit(e, task, day, isReminder);
              } else {
                alert('Please fill all the fields');
              }
            }} >
            Save Task
          </Button>
        </div>
      </Form>
      ) : (<div></div>)}
      {posts?.length > 0 ? (<div >
        {posts?.map((item) => (
          <div key={item.id}
            style={item.isReminder ? { borderLeft: '3px solid green' } : {}}
            className="isReminder"
          >
            <div style={{
              display: "flex",
              justifyContent: 'space-between',
            }}>
              <div style={{
                margin: '10px'
              }}>{item.task}</div>
              <button onClick={() => handleDelete(item.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "red",
                }}
              >X</button>
            </div>
            <div style={{
              margin: ' 10px',
            }}>{item.day}</div>
          </div>
        ))}
      </div>) : (
        <p>No Tasks To Show</p>
      )}
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>
          MiniProject API & Asynchronous <i class='fa-regular fa-copyright' />{' '}
          2023
        </p>
        <Link to='/about'>About</Link>
      </div>
    </div>
  );
}

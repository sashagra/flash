import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  FormGroup,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Select,
  Grid,
  Slider,
  Input,
} from '@material-ui/core'
import TimerIcon from '@material-ui/icons/Timer'
import './BlockParameters.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  button: {
    width: 140,
  },
  formControl: {
    margin: theme.spacing(3)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  buttonCheckParams: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
}))

const BlockParameters = (props) => {
  const classes = useStyles()

  const [time, setTime] = React.useState(1)
  const [countNumber, setCountNumber] = React.useState(1)
  const [name, setName] = React.useState('пользователь')

  const handleTextField = (event) => {
    setName(event.target.value)
  }

  const handleSliderChange = (event, newValue) => {
    setTime(newValue)
  }

  const handleChange = (event) => {
    setCountNumber(event.target.value)
  }

  const handleInputChange = (event) => {
    setTime(event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleBlur = () => {
    if (time < 0.1) {
      setTime(0.1)
    } else if (time > 5) {
      setTime(5)
    }
  }

  const checkData = () => {
    props.dataParams(time, countNumber, name)
  }

  return (
    <div className="blockParameters">
      <FormGroup className="formGroup">
        <h3>Введите параметры для начала игры</h3>
        <TextField
          id="outlined-helperText"
          label="Вводите текст"
          defaultValue={name}
          helperText="Введите ваше имя"
          variant="outlined"
          onChange={handleTextField}
        />
        <Typography id="input-slider" variant="h5" gutterBottom>
          Укажите скорость воспроизведения картинок
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TimerIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof time === 'number' ? time : 1}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              max={5}
              min={0.1}
              step={0.1}
            />
          </Grid>
          <Grid item>
            <Input
              value={time}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 0.1,
                min: 0.1,
                max: 5,
                size: 3,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        <Typography id="input-select" variant="h5" gutterBottom>
          Укажите желаемое количество цифр
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-outlined-label">Цифры</InputLabel>
          <Select
            labelId="select-outlined-label"
            id="simple-select-outlined"
            value={countNumber}
            onChange={handleChange}
            label="countNumber"
          >
            <MenuItem value={1}>Одна</MenuItem>
            <MenuItem value={2}>Две</MenuItem>
            <MenuItem value={3}>Три</MenuItem>
            <MenuItem value={4}>Четыре</MenuItem>
            <MenuItem value={5}>Пять</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={checkData} className={classes.buttonCheckParams}>
          НАЧАТЬ ИГРУ
        </Button>
      </FormGroup>
    </div>
  )
}

export default BlockParameters

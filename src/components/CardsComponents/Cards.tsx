import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {ChangeEvent, useEffect, useState} from 'react';
import {fetchCardsTC} from '../../redux/reducers/reducerCards';
import styles from './Cards.module.css'

import {Redirect, useParams} from 'react-router-dom';
import {cardsType} from '../../API/cardsAPI';
import {routes} from '../../App';

type CardsPropsType = {
  id?: string
}

export const Cards = (props: CardsPropsType) => {
  const cards = useSelector<AppRootStateType, Array<cardsType>>(state => state.cards)
  const dispatch = useDispatch()
  const {id} = useParams<{ id: string }>()

  const [back, setBack] = useState(false)
  const [searchValue, setSearchValue] = useState('')


  function backToPacks() {
    setBack(true)
  }

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value
    setSearchValue(text)
  }

  const card = () => {
    const filterItems = cards.filter((c) =>
        c.question.toLowerCase().includes(searchValue.toLowerCase())
    )

    return filterItems.map(c => c._id !== props.id
        && <tbody key={c._id}>
      <td>{c.question}</td>
      <td>{c.answer}</td>
      <td>{c.grade}</td>
      <td>{c.updated}</td>
      <td>
        <button onClick={deleteCard}>Delete</button>
        <button onClick={editCard}>Edit</button>
      </td>
      </tbody>)
  }

  const deleteCard = () => {

  }
  const editCard = () => {

  }

  useEffect(() => {
    dispatch(fetchCardsTC(id))
  }, [])

  if (back) {
    return <Redirect to={routes.packs}/>
  }
  return (
      <div className={styles.packs}>

        <div className={styles.header}>
          <button onClick={backToPacks}>back</button>
          <div>Packs list</div>
        </div>
        <div className={styles.container}>
          <input className={styles.inpCard}
                 value={searchValue}
                 onChange={onChangeSearchInput}
                 placeholder="Search..."/>
          <table className={styles.table}>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Grade</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
            {card()}
          </table>
        </div>


      </div>
  )
}
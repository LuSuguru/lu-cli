import style from './style.module.less'

export default () => (
  <div className={style.loading}>
    <ul className={style.container}>
      <li className={style.dot} />
      <li className={style.dot} />
      <li className={style.dot} />
    </ul>
  </div>
)

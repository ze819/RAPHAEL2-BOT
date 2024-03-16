const rewards = {
  exp: 40000,
  money: 55555,
  potion: 10,
  mythic: 3,
  legendary: 1
}

const cooldown = 2592000000
let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastmonthly < cooldown) throw `تم تجميع المكافئه الشهريه بالفعل *${((user.lastmonthly + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) if (reward in user) {
      user[reward] += rewards[reward]
      text += `*+${rewards[reward]}* ${reward}\n`
  }
  //conn.sendButton(m.chat,'*––––––『 MONTHLY 』––––––*', text.trim(), null, [['Inventory', '.inv'], ['Menu', '.menu']],m)
  m.reply(`
  🎁*المكافئه الشهريه*🎁

  ▢*تم الحصول على:*
   ${text}`)
  user.lastmonthly = new Date * 1
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.command = /^(شهري)$/i

handler.cooldown = cooldown

export default handler

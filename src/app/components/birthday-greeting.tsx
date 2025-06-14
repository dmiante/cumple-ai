interface BirthdayGreetingProps {
  content: string
  name: string
  birthday: string
}

function BirthdayGreeting({ content, name, birthday }: BirthdayGreetingProps) {
  return (
    <div>
      {content}
      {name}
      {birthday}
    </div>
  )
}

export default BirthdayGreeting
import ContestForm from '../../components/forms/ContestForm'
import Layout from '../../components/Layout'

const CreateContest = () => {
  return (
    <Layout>
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">
          Create Pool
        </h3>
        <ContestForm />
    </Layout>
  )
}

export default CreateContest

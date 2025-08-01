using ExaminationSystemDB.Models;

namespace ExaminationSystemDB.Repositories
{
    public class AnswerRepository :GenericRepo<Answer>
    {
        public AnswerRepository(ExamContext c) : base(c)
        {
        }
        // get correct answer of a question

        public Answer GetCorrectAnswer(int Qid)
        {
            return con.Answer.Where(a => a.QuestionId == Qid && a.IsCorrect)
                .FirstOrDefault();
        }


        // get all answer of a question

        public List<Answer> GetAllAnswers(int Qid)
        {
            return con.Answer.Where(a => a.QuestionId == Qid)
                .ToList();
        }

    }
}

using ExaminationSystemDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ExaminationSystemDB.Repositories
{
    public class QuestionRepository : GenericRepo<Question>
    {
        public QuestionRepository(ExamContext c) : base(c)
        {
        }

        public List<Question> GetQuestionsInfo()
        {
            return con.Question.Include(q => q.answers).ToList();
        }


        public List<Question> GetAllExamQuestions(int id)
        {
            return con.Question.Include(q => q.answers).Where(q => q.ExamId == id).ToList();
        }

        public Question GetQuestionByID (int id)
        {
            return con.Question.Include(q => q.answers).FirstOrDefault(q => q.Id == id);
        }
    
    
    
    }
}

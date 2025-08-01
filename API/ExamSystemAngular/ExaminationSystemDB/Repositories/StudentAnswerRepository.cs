using ExaminationSystemDB.Models;

namespace ExaminationSystemDB.Repositories
{
    public class StudentAnswerRepository : GenericRepo<StudentAnswer>
    {
        public StudentAnswerRepository(ExamContext c) : base(c)
        {
        }

        // get student Answer for a specific question
        public StudentAnswer GetAnswerForQusetion(int Qid, int SID)
        {
            return con.StudentAnswer.Where(a => a.QuestionId == Qid && a.StudentId == SID).FirstOrDefault();
        }



    }
}

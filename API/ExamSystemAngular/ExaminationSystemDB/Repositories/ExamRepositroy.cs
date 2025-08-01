using ExaminationSystemDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ExaminationSystemDB.Repositories
{
    public class ExamRepositroy : GenericRepo<Exam>
    {
        public ExamRepositroy(ExamContext c) : base(c)
        {
        }
        public List<Exam> GetExamsInfo()
        {
            return con.Exam.Include(e=> e.question).ThenInclude(q=> q.answers).ToList();
        }

        public Exam getExamByID(int id)
        {
            return con.Exam.Include(e => e.question).ThenInclude(q => q.answers).FirstOrDefault(e => e.Id == id);
        }

        public List<Exam> getRestExams(List<int> taken)
        {
            return con.Exam.Where(e => !taken.Contains(e.Id)).ToList();
        }
	public new List<Exam> getAll()
        {
            return con.Exam.Include(e => e.question).ToList();
        }


    }
}

using ExaminationSystemDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ExaminationSystemDB.Repositories
{
    public class StudentExamRepository : GenericRepo<StudentExam>
    {
        public StudentExamRepository(ExamContext c) : base(c)
        {

        }
        public List<int> getStudentExamsIds(int id)
        {
            return con.StudentExam.Where(x=>x.StudentId == id).Select(x=>x.ExamId).ToList();
        }
        public List<StudentExam> getStudentExams(int id)
        {
            return con.StudentExam.Where(x=>x.StudentId == id).Include(x=>x.exam).ToList();
        }
        public StudentExam getStudentExamResult(int examId , int studentId) {

            return con.StudentExam.Include(x=>x.exam).FirstOrDefault(x => x.StudentId == studentId && x.ExamId == examId);
        
        }

	public List<StudentExam> getStudentsResultsForExam(int examId)
        {
            return con.StudentExam
                .Where(se => se.ExamId == examId)
                .Include(se => se.student)
                .Include(se => se.exam)
                .OrderByDescending(se => se.StudentGrade)
                .ToList();
        }
        public List<StudentExam> getWithExam()
        {
            return con.StudentExam.Include(s => s.exam).ToList();
        }
    }
    
}

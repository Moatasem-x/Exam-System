using ExaminationSystemDB.Models;
using ExaminationSystemDB.Repositories;

namespace ExaminationSystemDB.UnitOfWorks
{
    public class UnitOfWork
    {
        ExamContext db;

        GenericRepo<Student> studentRepo;
        AnswerRepository answerRepo;
        //GenericRepo<Exam> examRepo;
        ExamRepositroy examRepo;
        QuestionRepository questionRepo;
        StudentAnswerRepository studentAnswerRepo;
        //GenericRepo<StudentExam> studentExamRepo;
        StudentExamRepository studentExamRepo;


        public UnitOfWork(ExamContext db) {
            this.db = db;
        }
        public GenericRepo<Student> StudentRepo { 
            get {
                if(studentRepo == null) 
                    studentRepo = new GenericRepo<Student> (db);    
                return studentRepo;
            } 
        }
        public AnswerRepository AnswerRepo
        {
            get
            {
                if (answerRepo == null)
                    answerRepo = new AnswerRepository(db);
                return answerRepo;
            }
        }
        public ExamRepositroy ExamRepo
        {
            get
            {
                if (examRepo == null)
                    examRepo = new ExamRepositroy(db);
                return examRepo;
            }
        }
        public QuestionRepository QuestionRepo
        {
            get
            {
                if (questionRepo == null)
                    questionRepo = new QuestionRepository(db);
                return questionRepo;
            }
        }
        public StudentAnswerRepository StudentAnswerRepo
        {
            get
            {
                if (studentAnswerRepo == null)
                    studentAnswerRepo = new StudentAnswerRepository(db);
                return studentAnswerRepo;
            }
        }
        public StudentExamRepository  StudentExamRepo
        {
            get
            {
                if (studentExamRepo == null)
                    studentExamRepo = new StudentExamRepository(db);
                return studentExamRepo;
            }
        }


        public void Save() {

            db.SaveChanges();
        }

    }
}

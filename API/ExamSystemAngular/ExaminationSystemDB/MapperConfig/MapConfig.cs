using AutoMapper;
using ExaminationSystemDB.DTOs.AdminDTOs;
using ExaminationSystemDB.DTOs.AnswerDTOs;
using ExaminationSystemDB.DTOs.ExamDTOs;
using ExaminationSystemDB.DTOs.QuestionDTOs;
using ExaminationSystemDB.DTOs.StudentDTOs;
using ExaminationSystemDB.DTOs.StudentAnswerDTOs;
using ExaminationSystemDB.DTOs.StudentExamDTO;
using ExaminationSystemDB.Models;
using Microsoft.AspNetCore.Mvc;
namespace ExaminationSystemDB.MapperConfig
{
    public class MapConfig:Profile
    {
        public MapConfig() {
	CreateMap<StudentExam, DisplayStudentGradesDTO>().AfterMap((src, dest) =>
            {
                dest.StudentName = src.student.Name;
                dest.StudentEmail = src.student.Email;
                dest.MaxGrade = src.exam.Grade;
                dest.Status = src.StudentGrade >= src.exam.MinGrade ? "Passed" : "Failed";
                dest.DurationTaken = (int)(src.EndTime - src.StartTime).TotalMinutes;
            }).ReverseMap();

            CreateMap<Exam, DisplayExamSummaryDTO>().AfterMap((src, dest) =>
            {
                dest.MaxGrade = src.Grade;
                dest.DurationInMinutes = src.Duration;
                dest.TotalQuestions = src.question?.Count ?? 0;
            }).ReverseMap();
            CreateMap<Exam, AdminExamDTO>().ReverseMap();
            CreateMap<Question, EditQuestionDTO>().AfterMap((src, dest) =>
            {
                //dest.Qid = src.Id;
            }).ReverseMap().AfterMap((src, dest) =>
            {
                //dest.Id = src.Qid;
            });
            CreateMap<Exam, DisplayExamDTO>().AfterMap((src, dest) =>
            {
                dest.duration = src.Duration;
            }).ReverseMap();

            CreateMap<StudentExam, DisplayStudentExamDTO>().AfterMap((src, dest) =>
            {
                dest.ExamName = src.exam.Name;
                dest.ExamGrade = src.exam.Grade;
                dest.MinGrade = src.exam.MinGrade;
            }).ReverseMap();
            CreateMap<Answer, AdminAnswerDTO>().ReverseMap();
            CreateMap<Answer, AnswerDTO>().AfterMap((src, des) => {
                des.AnswerText = src.AnswerText;
                des.AnswerId = src.ID;
            }).ReverseMap();

            CreateMap<Student, AdminDisplayStudentInfo>().ReverseMap();
            //CreateMap<Question,AdminQuestionDTO>().ReverseMap();
            CreateMap<Question,AddQuestionDTO>().ReverseMap();
            CreateMap<StudentAnswer, AddStudentAnswerDTO>().ReverseMap();
            CreateMap<Answer, StudentAnswersDTO>().ReverseMap();
            CreateMap<Question, getStudentQuestionDTO>().ReverseMap();
            CreateMap<TakeStudentExamDTO, Exam>().ReverseMap();
            CreateMap<AddStudentExamDTO, StudentExam>().ReverseMap();
            CreateMap<AddExamDataDTO, Exam>().ReverseMap();
            CreateMap<Exam, AddQuestionDTO>().ReverseMap();
            CreateMap<Exam, ExamWithQuestionsDTO>().ReverseMap();

            CreateMap<Question, ExamStudentAnswer>().AfterMap((src, des) =>
            {
                des.QuestionId = src.Id;
                des.QuestionText = src.Body;
                des.Grade = src.Grade;
            });

        }

    }
}

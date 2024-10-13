import User ,{IUser} from "../models/userModel"
import Klass, {Iklass, IGrade, IStudent} from "../models/classModel"
import {Types} from "mongoose"




export const createUser = async(user:IUser): Promise<Iklass | null>=>{
    type myObject = {name: string}
    const role = user.role
   const allClassesName: myObject[] = await allClasses();
   let result: any[] = allClassesName.map(({ name }) => name)

  
  
    if(role === "student"){
        if(result.includes(user.class)){
        const newUser = await User.create(user);

        const class1 = await Klass.findOneAndUpdate({name: user.class}, {$push: {studentsWithGrades: newUser._id}},{new:true});
        return class1}
        else{
            return null
        }

    }
    else{
        
        if(!(result.includes(user.class))){
            const newUser = await User.create(user);
            const newclass = new Klass({
                name: user.class,
                teacherId: newUser._id,
            })
           const savedClass = await Klass.create(newclass);
           return savedClass
        }
        
    }
    return null
}
export const allClasses = async():Promise<any | null> => {
    try{
        return await Klass.find().select("name -_id").exec()
    }
catch(err){
    console.log(err)
    return null

}
}

export const addGrade = async(studentId: Types.ObjectId , teacherId: Types.ObjectId ,grade:IGrade ): Promise<any| null>=>{
    
        const addGrade = await Klass.updateOne(
        { teacherId: teacherId, 'studentsWithGrades.studentId': studentId }, 
            { $push: { 'studentsWithGrades.$.grades': grade } }, 
            { new: true }).populate({path: "studentsWithGrades"})
            console.log(addGrade)
          
            if(addGrade){return addGrade}
            else{
                return null
            }
  
        }

        export const deleteGrade = async(studentId: Types.ObjectId , teacherId: Types.ObjectId ,grade:IGrade ): Promise<any| null>=>{
    
            const addGrade = await Klass.updateOne(
            { teacherId: teacherId, 'studentsWithGrades.studentId': studentId }, 
                { $pull: { 'studentsWithGrades.$.grades': grade } }, 
                { new: true }).populate({path: "studentsWithGrades grades"})
                console.log(addGrade)
              
                if(addGrade){return addGrade}
                else{
                    return null
                }
      
            }
    
         export const getAverageGrades = async (klassId: Types.ObjectId): Promise<number | null> => {
                try {
                    const klass = await Klass.findOne({teacherId: klassId}, { studentsWithGrades: 1 }); 
                    console.log(klass)
            
                    if (klass && klass.studentsWithGrades && klass.studentsWithGrades.length > 0) {
                        let totalGrades: number = 0;
                        let totalCount = 0;
            
                  
                        klass.studentsWithGrades.forEach(student => {
                            if (student.grades) {
                                totalCount += student.grades.length; 
                                student.grades.forEach(gradeObj => {
                                    totalGrades += gradeObj.grade; 
                                });
                            }
                        });
            
                        // Calculate the average
                        const average = totalCount > 0 ? totalGrades / totalCount : 0; // Avoid division by zero
                        console.log('Average Grade:', average);
                        return average;
                    } else {
                        console.log('Class not found or no students with grades');
                        return null
                    }
                }catch(err){
                    console.log(err)
                    return null
                }}
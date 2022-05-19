import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FoldersService } from './folders.service';

@Controller('folders')
@UseGuards(AuthGuard)
export class FoldersController {
    constructor(private readonly foldersService: FoldersService) { };

    @Get('/')
    getAllFolders(@Request() req) {
        return this.foldersService.getAllFolders(req.userId);
    }

    @Get(':id')
    getFolderWithId(@Request() req, @Param('id') id: string) {
        return this.foldersService.getFolderWithId(id, req.userId);

    }

    @Post('/create')
    createFolder(@Request() req, @Body() newFolderData) {
        return this.foldersService.createFolder(newFolderData, req.userId)
    }

    @Put('/update/:id')
    updateFolderName(@Request() req, @Body('newName') newFolderName, @Param('id') id: string) {
        console.log("Update controller called!")
        return this.foldersService.updateFolderName(newFolderName, id, req.userId)
    }

    @Put('/update/add/doc')
    addDocumentToFolder(@Request() req, @Body('documentId') documentId, @Body('id') id: string) {
        console.log("Update controller called! ", id, documentId)
        return this.foldersService.addDocumentToFolder(documentId, id, req.userId)
    }

    @Put('/favorite/:id')
    favoriteFolder(@Param('id') id: string) {
        return this.foldersService.favoriteFolder(id);
    }

    @Put('/unfavorite/:id')
    unFavoriteFolder(@Param('id') id: string) {
        return this.foldersService.unFavoriteFolder(id);
    }


    @Delete('/delete/:id/doc')
    deleteDocumentFromFolder(@Request() req, @Body() documentId, @Param('id') id: string) {
        return this.foldersService.deleteDocumentFromFolder(documentId, id, req.userId)
    }

    @Delete('/delete/:id')
    deleteFolder(@Request() req, @Param('id') id: string) {
        return this.foldersService.deleteFolder(id, req.userId)
    }
}
